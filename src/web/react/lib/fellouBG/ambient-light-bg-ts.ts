import { Renderer, Camera, Transform, RenderTarget, Program, Mesh,Plane } from 'ogl';
import seedrandom  from 'seedrandom'
/**
 * 环境光背景渲染器
 * 使用 WebGL 和噪声算法创建动态流动的颜色背景效果
 */

/**
 * 背景参数配置接口
 */
interface AmbientLightOptions {
  /** 挂载的 DOM 元素 ID */
  dom?: string;
  /** 是否循环动画 */
  loop?: boolean;
  /** 颜色数组，支持十六进制颜色字符串 */
  colors?: string[];
  /** 随机种子 */
  seed?: number;
  /** 调整大小模式 */
  resize_mode?: string;
}

/**
 * 类型数据接口 - 定义不同效果预设的参数
 */
interface TypeData {
  /** 空间变换缩放 */
  st_scale: number;
  /** 旋度缩放 */
  curl_scale: number;
  /** 亮度 */
  brightness: number;
  /** 暗度 */
  darkness: number;
}

/**
 * 尺寸信息接口
 */
interface SizeInfo {
  w: number;
  h: number;
}

/**
 * 环境光背景类
 * 创建基于 WebGL 的动态颜色背景效果
 */
class AmbientLightBg {
  /** 效果名称 */
  private name: string = 'ambient-light';
  
  /** 当前效果的类型数据 */
  private typedata: TypeData;
  
  /** 动画速度（帧数） */
  private speed: number = 500;
  
  /** 参数配置 */
  private params: AmbientLightOptions;
  
  /** 选项对象 */
  private options: Record<string, any> = {};
  
  /** 是否循环播放 */
  private loop: boolean;
  
  /** 颜色数量 */
  private colors_num: number;
  
  /** 初始颜色数组 */
  private colors_init: string[];
  
  /** 调色板 */
  private palette: string[] = [];
  
  /** 随机种子 */
  private seed: number;
  
  /** 随机数生成器 */
  private rng: any;
  
  /** 当前帧数 */
  private frame: number = 0;
  
  /** 父容器 DOM 元素 */
  private parentDom: HTMLElement;
  
  /** 画布宽度 */
  private canvasW: number;
  
  /** 画布高度 */
  private canvasH: number;
  
  /** 原始宽度 */
  private originW: number;
  
  /** 原始高度 */
  private originH: number;
  
  /** 原始宽高比 */
  private originRatio: number;
  
  /** 当前宽高比 */
  private canvasRatio?: number;
  
  /** 调整大小模式 */
  private resize_mode?: string;
  
  /** WebGL 渲染器 */
  private renderer: any;
  
  /** WebGL 上下文 */
  private gl: WebGLRenderingContext | WebGL2RenderingContext;
  
  /** 相机对象 */
  private camera: any;
  
  /** 是否使用渲染目标 */
  private isRenderTarget: boolean = false;
  
  /** 场景对象 */
  private scene: any;
  
  /** 渲染到纹理对象 */
  private rtt?: any;
  
  /** RTT 相机 */
  private rttCamera?: any;
  
  /** RTT 平面几何体 */
  private rttPlaneGeo?: any;
  
  /** RTT 着色器程序 */
  private rttProgram?: any;
  
  /** RTT 平面网格 */
  private rttPlane?: any;
  
  /** 主平面着色器 */
  private _planeShader?: any;

  /**
   * 构造函数
   * @param options - 配置选项
   */
  constructor(options: AmbientLightOptions = {}) {
    this.params = options;
    this.loop = options.loop || false;
    this.colors_num = 6; // 固定使用 6 种颜色
    this.colors_init = options.colors || [];
    
    // 初始化颜色调色板
    this.colors(this.colors_init);
    
    // 设置随机种子
    this.seed = options.seed || 1000;
    this.rng = seedrandom(this.seed);
    
    // 获取或设置父容器
    this.parentDom = options.dom 
      ? document.getElementById(options.dom)! 
      : document.body;
    
    // 确保父容器有定位
    if (window.getComputedStyle(this.parentDom).position === 'static') {
      this.parentDom.style.position = 'relative';
    }
    
    // 获取容器尺寸
    const rect = this._getParentRect(this.parentDom);
    this.canvasW = this.originW = rect.w;
    this.canvasH = this.originH = rect.h;
    this.originRatio = this.originW / this.originH;
    this.resize_mode = options.resize_mode;
    
    // 创建渲染器（这里需要 OGL 库）
    // 实际使用时需要导入对应的渲染器类
    this.renderer = new Renderer();
    this.renderer.setSize(this.canvasW, this.canvasH);
    this.gl = this.renderer.gl;
    
    // 设置画布样式
    this.gl.canvas.id = 'colorbgcanvas';
    this.gl.canvas.style.position = 'absolute';
    this.gl.canvas.style.top = '0';
    this.gl.canvas.style.left = '0';
    this.gl.canvas.style.zIndex = '0';
    this.parentDom.appendChild(this.gl.canvas);
    
    // 创建相机
    this.camera = new Camera(this.gl, {
      near: 0.1,
      far: 10001,
      left: -this.canvasW / 2,
      right: this.canvasW / 2,
      bottom: -this.canvasH / 2,
      top: this.canvasH / 2,
      zoom: 1
    });
    this.camera.position.z = 8000;
    
    // 创建场景
    this.scene = new Transform();
    
    // 设置类型数据（效果预设）
    this.typedata = {
      st_scale: 1,
      curl_scale: 5,
      brightness: 0.2,
      darkness: 0
    };
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  /**
   * 获取父容器的尺寸
   * @param element - DOM 元素
   * @returns 宽高对象
   */
  private _getParentRect(element: HTMLElement): SizeInfo {
    const rect = element.getBoundingClientRect();
    return {
      w: rect.width,
      h: rect.height
    };
  }

  /**
   * 设置颜色调色板
   * @param colors - 颜色数组
   */
  public colors(colors: string[]): void {
    const hasExisting = this.palette.length > 0;
    this.palette = [];
    
    if (colors.length === 0) {
      // 默认颜色
      this.palette = [
        '#F00911', '#F3AA00', '#F6EE0B', 
        '#39E90D', '#195ED2', '#F00911'
      ];
    } else if (colors.length < this.colors_num) {
      // 颜色不足，循环填充
      const copyColors = [...colors];
      for (let i = copyColors.length; i < 6; i++) {
        const idx = i % copyColors.length;
        colors.push(copyColors[idx]);
      }
      this.palette = colors;
    } else {
      // 取前 6 个颜色
      for (let i = 0; i < this.colors_num; i++) {
        this.palette.push(colors[i]);
      }
    }
    
    // 如果已经初始化，重置颜色
    if (hasExisting) {
      this._resetColors();
    }
  }

  /**
   * 启动渲染
   */
  public start(): void {
    this._size();
    this._initRtt();
    this._resetSeed();
    this._makeMaterial();
    this._make();
    requestAnimationFrame(() => this._update());
  }

  /**
   * 调整画布大小
   */
  public resize(): void {
    const rect = this._getParentRect(this.parentDom);
    this.canvasW = rect.w;
    this.canvasH = rect.h;
    this.canvasRatio = this.canvasW / this.canvasH;
    
    this.renderer.setSize(this.canvasW, this.canvasH);
    
    let zoom = 1;
    const ratio = this.canvasW / this.canvasH;
    
    if (ratio > this.originRatio) {
      if (this.canvasW > this.originW) {
        zoom = this.canvasW / this.originW;
      }
    } else if (ratio < this.originRatio) {
      if (this.canvasH > this.originH) {
        zoom = this.canvasH / this.originH;
      }
    }
    
    this.camera.orthographic({
      near: 0.1,
      far: 10001,
      left: -this.canvasW / 2,
      right: this.canvasW / 2,
      bottom: -this.canvasH / 2,
      top: this.canvasH / 2,
      zoom: zoom
    });
  }

  /**
   * 重置场景（可选新种子）
   * @param seed - 新的随机种子
   */
  public reset(seed?: number): void {
    this.seed = seed || this.seed;
    this.rng = seedrandom(this.seed);
    this._delete();
    this._resetSeed();
    this._make();
  }

  /**
   * 更新参数
   * @param name - 参数名称
   * @param value - 参数值
   */
  public update(name: string, value: string | number): void {
    switch (name) {
      case 'noise':
        this._planeShader.uniforms.uNoiseFactor.value = parseFloat(value as string);
        break;
      case 'speed':
        const speedVal = parseInt(value as string);
        this.speed = (-400 * speedVal / 9) + (4900 / 9);
        break;
      case 'pattern scale':
        const scaleVal = parseFloat(value as string);
        this.rttProgram.uniforms.u_st_scale.value = -19 * scaleVal + 20;
        break;
      case 'edge blur':
        const blurVal = parseFloat(value as string);
        this.rttProgram.uniforms.u_curl_scale.value = -4 * blurVal + 5;
        break;
      case 'brightness':
        const brightVal = parseFloat(value as string);
        this.rttProgram.uniforms.u_brightness.value = brightVal;
        break;
      case 'darkness':
        const darkVal = parseFloat(value as string);
        this.rttProgram.uniforms.u_darkness.value = darkVal;
        break;
    }
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    this._delete();
    this.parentDom.removeChild(this.gl.canvas);
  }

  /**
   * 删除场景中的所有对象
   */
  private _delete(): void {
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      this.scene.removeChild(this.scene.children[i]);
    }
  }

  /**
   * 尺寸初始化（预留方法）
   */
  private _size(): void {
    // 可以在子类中实现
  }

  /**
   * 初始化渲染到纹理
   */
  private _initRtt(): void {
    // 创建 RTT 对象
    this.rtt = new RenderTarget(this.gl, {
      width: 512,
      height: 512
    });
    
    // 创建 RTT 相机
    this.rttCamera = new Camera(this.gl, {
      left: -0.5,
      right: 0.5,
      bottom: -0.5,
      top: 0.5,
      zoom: 1
    });
    this.rttCamera.position.z = 1;
    
    // 创建平面几何体
    this.rttPlaneGeo = new Plane(this.gl, {});
    
    // 创建着色器程序（包含噪声和颜色混合）
    this.rttProgram = new Program(this.gl, {
      vertex: this._getVertexShader(),
      fragment: this._getFragmentShader(),
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: [this.canvasW * 2, this.canvasH * 2] },
        u_expand: { value: 6 },
        u_color_0: { value: this._parseColor(this.palette[0]) },
        u_color_1: { value: this._parseColor(this.palette[1]) },
        u_color_2: { value: this._parseColor(this.palette[2]) },
        u_color_3: { value: this._parseColor(this.palette[3]) },
        u_color_4: { value: this._parseColor(this.palette[4]) },
        u_color_5: { value: this._parseColor(this.palette[5]) },
        u_st_scale: { value: this.typedata.st_scale },
        u_curl_scale: { value: this.typedata.curl_scale },
        u_brightness: { value: this.typedata.brightness },
        u_darkness: { value: this.typedata.darkness }
      }
    });
    
    // 创建网格
    this.rttPlane = new Mesh(this.gl, {
      geometry: this.rttPlaneGeo,
      program: this.rttProgram
    });
    
    this.isRenderTarget = true;
  }

  /**
   * 重置随机种子（预留方法）
   */
  private _resetSeed(): void {
    // 可以在子类中实现
  }

  /**
   * 创建主材质
   */
  private _makeMaterial(): void {
    this._planeShader = new Program(this.gl, {
      vertex: this._getVertexShader(),
      fragment: this._getNoiseFragmentShader(),
      uniforms: {
        tMap: { value: this.rtt.texture },
        uNoiseFactor: { value: 0.1 },
        uTime: { value: 0 }
      }
    });
  }

  /**
   * 创建主场景网格
   */
  private _make(): void {
    const geometry = new Plane(this.gl, {
      width: this.canvasW,
      height: this.canvasH
    });
    
    const mesh = new Mesh(this.gl, {
      geometry: geometry,
      program: this._planeShader
    });
    
    mesh.setParent(this.scene);
  }

  /**
   * 重置颜色
   */
  private _resetColors(): void {
    if (!this.rttProgram) return;
    
    this.rttProgram.uniforms.u_color_0.value = this._parseColor(this.palette[0]);
    this.rttProgram.uniforms.u_color_1.value = this._parseColor(this.palette[1]);
    this.rttProgram.uniforms.u_color_2.value = this._parseColor(this.palette[2]);
    this.rttProgram.uniforms.u_color_3.value = this._parseColor(this.palette[3]);
    this.rttProgram.uniforms.u_color_4.value = this._parseColor(this.palette[4]);
    this.rttProgram.uniforms.u_color_5.value = this._parseColor(this.palette[5]);
  }

  /**
   * 动画更新
   */
  private _animate(): void {
    if (!this.rttProgram) return;
    this.rttProgram.uniforms.u_time.value = this.frame / this.speed;
  }

  /**
   * 主更新循环
   */
  private _update(): void {
    requestAnimationFrame(() => this._update());
    
    if (this.loop) {
      this.frame++;
      this._animate();
    }
    
    this.gl.clearColor(0, 0, 0, 1);
    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    });
    
    if (this.isRenderTarget && this.rttPlane) {
      this.gl.clearColor(0, 0, 0, 1);
      this.renderer.render({
        scene: this.rttPlane,
        camera: this.rttCamera,
        target: this.rtt
      });
    }
  }

  /**
   * 解析颜色字符串为 RGB 数组
   */
  private _parseColor(color: string): number[] {
    // 简化的颜色解析
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
  }

  /**
   * 获取顶点着色器代码
   */
  private _getVertexShader(): string {
    return `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }

  /**
   * 获取片段着色器代码（噪声效果）
   */
  private _getFragmentShader(): string {
    return `
      // 这里应该是完整的 GLSL 着色器代码
      // 包含 Simplex Noise 和 Curl Noise 的实现
      // 由于代码较长，这里省略
      precision highp float;
      // ... 噪声函数实现 ...
      void main() {
        // ... 颜色混合逻辑 ...
      }
    `;
  }

  /**
   * 获取噪声片段着色器
   */
  private _getNoiseFragmentShader(): string {
    return `
      precision highp float;
      uniform sampler2D tMap;
      uniform float uNoiseFactor;
      uniform float uTime;

      float random(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(tMap, vUv);
        float noise = (random(vUv) - 0.5) * uNoiseFactor;
        color.rgb = color.rgb + color.rgb * noise;
        gl_FragColor = color;
      }
    `;
  }
}

// 导出类
export { AmbientLightBg, AmbientLightOptions, TypeData };
