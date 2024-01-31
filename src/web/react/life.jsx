export default class Life extends React.Component {
    state = { opacity: 1 };
    death = () => {
        //组件卸载
        ReactDOM.unmountComponentAtNode(
            document.getElementById('test')
        );
    };
    animate = () => {
        let { opacity } = this.state;
        opacity = opacity <= 0.1 ? 1 : opacity - 0.1;
        this.setState({ opacity });
    };
    componentWillMount() {
        //组件将要挂载
    }
    //组件挂载完成后调用
    componentDidMount() {
        this.timer = setInterval(this.animate, 200);
    }
    //组件卸载前调用
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    //组件的渲染,控制
    shouldComponentUpdate() {
        return true;
    }
    componentWillUpdate() {
        //组件将要更新
    }
    componentDidUpdate() {
        //组件更新完成
    }

    force = () => {
        //强制更新
        this.forceUpdate();
    };
    //初始化渲染、state改变时候调用
    render() {
        console.log(`render`);
        return (
            <div>
                <h3 style={{ opacity: this.state.opacity }}>
                    react
                </h3>{' '}
                <button onClick={this.death}>按钮</button>
                <button onClick={this.force}>force按钮</button>
            </div>
        );
    }
}
