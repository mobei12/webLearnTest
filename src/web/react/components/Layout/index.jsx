import { useMemo, useRef, useEffect, Suspense, useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { menus } from "../../router";

// 源代码展示组件
function CodeDisplay({ currentMenu }) {
  const [sourceCode, setSourceCode] = useState("");
  const [loading, setLoading] = useState(false);
  const componentName = currentMenu?.name || "未选择组件";
  const currentPath = currentMenu?.path || "";
  const codeRef = useRef(null);

  // 异步加载源代码
  useEffect(() => {
    if (currentMenu?.getSourceCode) {
      setLoading(true);
      setSourceCode("");

      currentMenu
        .getSourceCode()
        .then((module) => {
          // Vite的?raw导入返回的是 { default: string }
          setSourceCode(module.default || module);
        })
        .catch((error) => {
          console.error("加载源代码失败:", error);
          setSourceCode("// 加载源代码失败");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSourceCode("// 选择一个路由查看源代码");
      setLoading(false);
    }
  }, [currentMenu]);

  // 使用Prism.js进行语法高亮
  useEffect(() => {
    if (window.Prism && codeRef.current && sourceCode && !loading) {
      // 清除之前的高亮
      codeRef.current.removeAttribute("data-highlighted");
      // 重新高亮
      window.Prism.highlightElement(codeRef.current);
    }
  }, [sourceCode, loading]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        height: "100%",
        overflow: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        {componentName} - 源代码
      </h2>
      <div style={{ fontSize: "14px", marginBottom: "10px", color: "#666" }}>
        当前路由: {currentPath}
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            color: "#666",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #1890ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginRight: "10px",
            }}
          />
          源代码加载中...
        </div>
      ) : (
        <pre
          style={{
            margin: 0,
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "1.5",
            overflow: "auto",
            maxHeight: "70vh",
            border: "1px solid #333",
          }}
        >
          <code
            ref={codeRef}
            className="language-jsx"
            style={{
              fontFamily:
                "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
              fontSize: "13px",
            }}
          >
            {sourceCode}
          </code>
        </pre>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

// 导航组件
function Navigation({ navigationLinks }) {
  return (
    <div
      style={{
        display: "flex",
        width: "15%",
        flexDirection: "column",
        gap: "20px",
        color: "#fff",
        fontSize: "3rem",
      }}
    >
      {navigationLinks}
    </div>
  );
}

// 加载状态组件
function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        fontSize: "16px",
        color: "#666",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid #f3f3f3",
          borderTop: "2px solid #1890ff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginRight: "10px",
        }}
      />
      组件加载中...
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

// 主内容区组件
function MainContent({ routeElements, currentMenu }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        flex: 1,
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routeElements}
          {/* 路由不匹配，重定向到 /Life */}
          <Route path="*" element={<Navigate to="/Life" />} />
        </Routes>
      </Suspense>
      <CodeDisplay currentMenu={currentMenu} />
    </div>
  );
}

// 布局组件 - 统一管理应用的整体布局和数据流
function Layout() {
  const location = useLocation();

  // 使用useMemo缓存计算结果，真正的一次遍历优化
  const { navigationLinks, routeElements, currentMenu } = useMemo(() => {
    // 一次遍历生成所有需要的数据
    const navigationLinks = [];
    const routeElements = [];
    let currentMenu = null;

    menus.forEach((router) => {
      // 判断是否为当前激活路由
      const isActive = router.path === location.pathname;

      // 生成导航链接（带激活状态样式）
      navigationLinks.push(
        <Link
          key={router.path}
          style={{
            color: isActive ? "#1890ff" : "#fff",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: isActive
              ? "rgba(24, 144, 255, 0.1)"
              : "transparent",
            border: isActive ? "1px solid #1890ff" : "1px solid transparent",
            transition: "all 0.3s ease",
            display: "block",
            marginBottom: "8px",
          }}
          to={router.path}
        >
          <span className="routerLink">{router.name}</span>
        </Link>
      );

      // 生成路由元素
      routeElements.push(
        <Route
          style={{ with: "50%" }}
          key={router.path}
          path={router.path}
          element={<router.component />}
        />
      );

      // 查找当前菜单（如果匹配）
      if (isActive) {
        currentMenu = router;
      }
    });

    return { navigationLinks, routeElements, currentMenu };
  }, [location.pathname]); // 只在路由变化时重新计算

  return (
    <>
      <Navigation navigationLinks={navigationLinks} />
      <MainContent routeElements={routeElements} currentMenu={currentMenu} />
    </>
  );
}

export default Layout;
