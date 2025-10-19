# AmbientLightBg 技术文档

## 概述

AmbientLightBg 是一个基于 WebGL 的动态背景渲染库，能够创建流动、渐变的环境光效果。该库使用高级噪声算法和着色器技术，生成平滑、连续的颜色过渡动画。

## 技术原理

### 1. 核心技术栈

- **WebGL 2.0/1.0**: 硬件加速的图形渲染
- **OGL (Open Graphics Library)**: 轻量级 WebGL 封装库
- **GLSL Shaders**: GPU 着色器编程
- **Render-to-Texture**: 离屏渲染技术

### 2. 渲染管线

```
初始化阶段:
  创建 WebGL 上下文
    ↓
  设置正交相机
    ↓
  创建 RTT (Render-to-Texture) 目标
    ↓
  编译着色器程序

渲染循环:
  更新时间 uniform
    ↓
  渲染到纹理 (RTT)
    ├─ 计算 3D 噪声场
    ├─ 应用 Curl Noise 变换
    └─ 混合多层颜色
    ↓
  从纹理渲染到屏幕
    ├─ 采样 RTT 纹理
    ├─ 添加屏幕噪声
    └─ 输出最终颜色
```

### 3. 噪声算法

#### 3.1 Simplex Noise (单纯形噪声)

Simplex Noise 是一种改进的 Perlin Noise，具有以下特点：

- **更少的计算复杂度**: O(n²) vs Perlin 的 O(n·2ⁿ)
- **无方向性伪影**: 视觉上更自然
- **平滑连续**: 所有阶导数连续

实现原理：

```glsl
// 将 3D 空间分割为单纯形网格
// 对每个点找到其所在的单纯形
// 计算该点到单纯形顶点的贡献
// 累加所有贡献得到最终噪声值
```

#### 3.2 Curl Noise (旋度噪声)

Curl Noise 是通过对噪声场取旋度（curl）运算得到的矢量场：

```
curl(V) = ∇ × V = (∂Vz/∂y - ∂Vy/∂z, ∂Vx/∂z - ∂Vz/∂x, ∂Vy/∂x - ∂Vx/∂y)
```

特点：

- **无散度**: ∇ · (∇ × V) = 0，粒子不会聚集或发散
- **流动感强**: 产生自然的涡旋和流动效果
- **平滑过渡**: 颜色边界自然融合

### 4. 颜色混合算法

使用 alpha 混合模式，逐层叠加颜色：

```glsl
// 对每个颜色层
color_layer = base_color * alpha
final_color = (1 - alpha) * previous_color + alpha * color_layer

// 多层混合
result = darkness_base
for each color_layer:
    result = blendColor(result, color_layer)
```

### 5. 性能优化

#### RTT (Render-to-Texture) 优化

- **降低分辨率**: RTT 使用 512×512 纹理，而非全屏分辨率
- **减少计算**: 噪声计算在低分辨率纹理上进行
- **纹理采样**: 最终渲染只需简单的纹理采样

#### 着色器优化

- **预计算常量**: 如泰勒级数系数
- **使用内建函数**: fract, floor, dot 等硬件加速函数
- **减少分支**: 使用数学函数代替 if-else

## 使用说明

### 安装依赖

```bash
# 需要 OGL 库
npm install ogl
# 或使用 CDN
<script src="https://cdn.jsdelivr.net/npm/ogl"></script>

# 需要 seedrandom 库（用于可重现的随机数）
npm install seedrandom
# 或
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>
```

### 基础使用

```typescript
import { AmbientLightBg } from "./ambient-light-bg";

// 创建实例
const bg = new AmbientLightBg({
  dom: "container", // 容器 ID
  loop: true, // 启用动画循环
  colors: [
    // 自定义颜色
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
  ],
  seed: 12345, // 随机种子（可选）
});

// 启动渲染
bg.start();
```

### HTML 结构

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script src="ambient-light-bg.js"></script>
  </body>
</html>
```

### API 方法

#### 1. `colors(colors: string[])`

设置或更新颜色调色板

```typescript
bg.colors(["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]);
```

#### 2. `start()`

启动渲染循环

```typescript
bg.start();
```

#### 3. `resize()`

响应窗口大小变化（自动调用）

```typescript
window.addEventListener("resize", () => {
  bg.resize();
});
```

#### 4. `reset(seed?: number)`

重置场景，可选新的随机种子

```typescript
bg.reset(54321);
```

#### 5. `update(name: string, value: string | number)`

动态更新参数

```typescript
// 调整噪声强度 (0-1)
bg.update("noise", 0.15);

// 调整动画速度 (0-10, 0最快，10最慢)
bg.update("speed", 5);

// 调整图案缩放 (0-1, 0最大，1最小)
bg.update("pattern scale", 0.3);

// 调整边缘模糊 (0-1, 0最模糊，1最锐利)
bg.update("edge blur", 0.7);

// 调整亮度 (0-2)
bg.update("brightness", 1.5);

// 调整暗度 (0-1)
bg.update("darkness", 0.1);
```

#### 6. `destroy()`

销毁实例并清理资源

```typescript
bg.destroy();
```

### 配置选项详解

```typescript
interface AmbientLightOptions {
  // 挂载容器的 DOM ID
  // 默认: document.body
  dom?: string;

  // 是否循环播放动画
  // 默认: false
  loop?: boolean;

  // 颜色数组（至少 6 个颜色）
  // 支持格式: '#
```
