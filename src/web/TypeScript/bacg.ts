/**
 * @author jjh
 * @version 1.0.0
 * @description 背景粒子动画
 * @update 更新记录
 * @memo 使用说明：particleBac(element, config [Object])
 * element:容器，
 * config:粒子配置
 * 例：
 * config={
 *     color:"#fff",//粒子默认白色
 *     count:100,//粒子默认100颗
 *     R:2,//粒子默认半径2px(现代码已改，可生成随机大小)
 *     line:true//粒子之间是否连线,默认true。
 *     distance:width / 10,//粒子间距小于多少会连线，默认是容器宽度的10%
 *     rate:width / 10000,//粒子运动的速率，默认是容器宽度的万分之一
 *     zIndex:1,//canvas的z-index默认是1
 *     resize:true,//是否监听window.resize，自动缩放粒子背景
 *     isGone:true,//是否在透明度为0的时候删除粒子
 * }
 */
function randomColor() {
    // 生成 RGB 颜色的三个分量值
    const r = Math.floor(Math.random() * 256); // 0 到 255 之间的随机整数
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // 将 RGB 分量值转换为十六进制表示，并拼接成十六进制表示的颜色值
    const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return hexColor;
}
interface IPoint {
    x: number;
    y: number;
    r: number;
    rate: number;
    xUp: boolean;
    yUp: boolean;
    color: string;
    opacity: number;
    opacityUp?: boolean;
}
function createPoint(obj: Particle): IPoint {
    let r = 0, color = randomColor()
    if (Array.isArray(obj.R)) {
        r = Math.random() * (obj.R[1] - obj.R[0]) + obj.R[0];
    } else {
        r = +(Math.random() * obj.R!).toFixed(4)
    }
    if (Array.isArray(obj.color)) {
        color = obj.color[Math.floor(Math.random() * obj.color.length)]
    } else if (typeof obj.color === 'string') {
        color = obj.color
    }
    const x = Math.ceil(Math.random() * obj.container!.clientWidth),
        y = Math.ceil(Math.random() * obj.container!.clientHeight),
                rate = +(Math.random() * 1).toFixed(4),
                xUp = Math.random() > 0.5 ? true : false,
                yUp = Math.random() > 0.5 ? true : false,
                opacity = Math.random(),
                opacityUp = Math.random() > 0.5 ? true : false;
    return {
        r,
        x,
        y,
        rate,
        xUp,
        yUp,
        color,
        opacity,
        opacityUp
    }
}
export interface TConfig {
    count: number;
    R?: number|number[];
    line?: boolean;
    color?: string|string[];
    distance?: number;
    rate?: number;
    zIndex?: number;
    resize?: boolean;
    isGone?: boolean;
    meteorMode?: boolean;
}



class Particle implements TConfig {
    count: number;
    R: number|number[] = 2;
    color?: string|string[];
    line?: boolean | undefined;
    isGone?: boolean | undefined;
    distance?: number | undefined = 10;
    rate?: number | undefined;
    meteorMode?: boolean;
    zIndex?: number | undefined = 1;
    resize?: boolean | undefined;
    container: HTMLElement;
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    points: Array<IPoint> = [];

    constructor(container: HTMLElement, { color, count, R = 2,isGone,meteorMode, line = false, distance, rate, zIndex, resize }: TConfig) {
        this.container = container;
        this.color = color;
        this.count = count;
        this.R = R;
        this.distance = distance || container.clientWidth / 10;
        this.rate = rate || container.clientWidth / 10000;
        this.zIndex = zIndex || 1;
        this.resize = resize || false;
        this.isGone = isGone || false;
        this.meteorMode =  meteorMode  || false;
        this.line = line;
        this.init();
    }

    private init() {
        this.addCanvas();
        this.setPoints(this.count);
        this.addResizeListener();
    }

    private addCanvas() {
        const { clientWidth: width, clientHeight: height } = this.container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.scale();
        this.canvas.style.zIndex = this.zIndex!.toString();
        this.container.appendChild(this.canvas);
    }

    private scale() {
        let ratio = window.devicePixelRatio || 1;
        this.ctx!.scale(ratio, ratio);
    }

    private setPoints(count: number) {
        while (count > 0) {
            this.points.push(createPoint(this));
            count--;
        }
    }

    private addResizeListener() {
        const func = (() => {
            const { clientWidth: width, clientHeight: height } = this.container;
            this.distance = this.distance || width / 10;
            this.rate = this.rate || width / 10000;
            this.canvas!.width = width;
            this.canvas!.height = height;
            this.scale();
        }).bind(this);
        window.addEventListener('resize', func);
    }

    private drawPoints() {
        const { clientWidth, clientHeight } = this.container;
        this.ctx!.clearRect(0, 0, clientWidth, clientHeight);
        for (let i = 0; i < this.points.length; i++) {
            const item = this.points[i];
            if(this.isGone&&item.opacity <= 0) {
                this.points.splice(i, 1);
                this.setPoints(1);
                continue
            }
            if (item.opacity >= 1) {
                item.opacityUp = false;
            } else if (item.opacity <= 0) {
                item.opacityUp = true;
            }
            if (item.opacityUp) {
                item.opacity += item.rate * this.rate! * 0.005
            } else {
                item.opacity -= item.rate * this.rate! * 0.005
            }
            if (item.opacity > 1) {
                item.opacityUp = false;
            } else if (item.opacity <= 0) {
                item.opacityUp = true;
            }
            // 判断粒子是否到达边界，需要改变方向
            if (item.x - item.r < 0 && !item.xUp) {
                item.xUp = true;
            } else if (item.x + item.r > clientWidth && item.xUp) {
                item.xUp = false;
            }
            if (item.y - item.r < 0 && !item.yUp) {
                item.yUp = true;
            } else if (item.y + item.r > clientHeight && item.yUp) {
                item.yUp = false;
            }
            // 简化粒子移动逻辑
            item.x += item.rate * this.rate! * (item.xUp ? 1 : -1);
            item.y += item.rate * this.rate! * (item.yUp ? 1 : -1);
            this.ctx!.beginPath();
            this.ctx!.arc(item.x, item.y, item.r, 0, Math.PI * 2);
            this.ctx!.fillStyle =  item.color!;
            this.ctx!.globalAlpha = item.opacity;
            this.ctx!.fill();
        };
        requestAnimationFrame(this.drawPoints.bind(this));
    }
    private drawMeteor() {
        const { clientWidth, clientHeight } = this.container;
        this.points.forEach((item,i,arr) => {
            if(this.isGone&&item.y + item.r > clientHeight||this.isGone&& item.x + item.r > clientWidth) {
                arr.splice(i, 1);
                arr.push(createPoint(this));
                return
            }
            // 简化粒子移动逻辑
            item.x += item.rate * this.rate!
            item.y += item.rate * this.rate!
            this.ctx!.beginPath();
            this.ctx!.arc(item.x, item.y, item.r, 0, Math.PI * 2);
            this.ctx!.fillStyle =  item.color!;
            this.ctx!.globalAlpha = item.opacity;
            this.ctx!.fill();
        })
        requestAnimationFrame(this.drawMeteor.bind(this));
    }

    draw() {
        if(this.meteorMode) this.drawMeteor();
        else this.drawPoints();
    }
}

function particleBac(element: HTMLElement, config: TConfig) {
    new Particle(element, config).draw();
}

particleBac(document.getElementById('app')!, {
    count: 200,
    isGone: true,
    R: [3, 15],
    meteorMode: true,
});
