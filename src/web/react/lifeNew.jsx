export default class LifeNew extends React.Component {
    constructor() {
        super();
        this.state = { opacity: 1, number: 0 };
        this.titleRec = React.createRef();
        console.log('constructor');
    }
    death = () => {
        //组件卸载
        ReactDOM.unmountComponentAtNode(
            document.getElementById('test')
        );
    };
    add = () => {
        this.setState({
            number: this.state.number + 1
        });
    };
    animate = () => {
        let { opacity } = this.state;
        opacity = opacity <= 0.1 ? 1 : opacity - 0.1;
        this.setState({ opacity });
    };
    //state的值取决于props的值,
    static getDerivedStateFromProps(props, state) {
        // ...
        console.log(`getDerivedStateFromProps`, props, state);
        return { number: 123 };
    }
    //此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // ...
        console.log(
            'getSnapshotBeforeUpdate',
            prevProps,
            prevState
        );
        return null;
    }
    //组件的渲染,控制
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
        // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
        //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
        if (snapshot !== null) {
            //do something
        }
        console.log('componentDidUpdate');
    }
    //组件挂载完成后调用
    componentDidMount() {
        console.log('componentDidMount');
        //this.timer = setInterval(this.animate, 200);
    }
    //组件卸载前调用
    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.timer);
    }
    //组件的渲染,控制
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        //组件更新完成
    }

    force = () => {
        //强制更新
        this.forceUpdate();
    };
    //初始化渲染、state改变时候调用
    render() {
        console.log(`render`);
        const { opacity, number } = this.state;
        return (
            <div>
                <h3 ref={this.titleRec}  style={{ opacity }}>react{number}</h3>{' '}
                <button onClick={this.add}>添加按钮</button>
                <button onClick={this.death}>卸载按钮</button>
                <button onClick={this.force}>force按钮</button>
            </div>
        );
    }
}
