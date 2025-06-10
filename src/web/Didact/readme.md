## 基本配置

- node 16.15

## 使用方式
- 进入当前文件夹安装依赖
- 最好在当前文件夹操作
------

```plaintext
              Didact.render(element, container)
                      │
                      ▼
             创建 wipRoot Fiber
                      │
                      ▼
      ┌──────── requestIdleCallback ───────┐
      ▼                                    │
  workLoop() ──────► performUnitOfWork(fiber)
                      │
                      ├─ updateFunctionComponent（函数组件）
                      │     └─ 调用 fiber.type(props)
                      │     └─ reconcileChildren
                      │
                      └─ updateHostComponent（DOM组件）
                            └─ createDom
                            └─ reconcileChildren
                      ▼
               设置 nextUnitOfWork
                      │
                      ▼
         如果没有下一个 Fiber → commitRoot()
                      │
                      ▼
               commitWork(fiber)
               ├─ effectTag = PLACEMENT → appendChild
               ├─ effectTag = UPDATE    → updateDom
               └─ effectTag = DELETION  → commitDeletion
                      ▼
                 currentRoot = wipRoot

```

