/**组件更新顺序(state变化时)
			 * 父 shouldComponentUpdate
			 * 父 componentWillUpdate
			 * 父render
			 * 子 组件传入的Prop属性发生了改变 {name: '小雅', age: '26'}
			 * 子 shouldComponentUpdate
			 * 子 componentWillUpdate
			 * 子 render
			 * 子 componentDidUpdate
			 * 父 componentDidUpdate
             *-----------------------------------------------------
             * 组件更新顺序(强制更新)
             * 
			 * 父 componentWillUpdate
			 * 父render
			 * 子 组件传入的Prop属性发生了改变 {name: '小雅', age: '26'}
			 * 子 shouldComponentUpdate
			 * 子 componentWillUpdate
			 * 子 render
			 * 子 componentDidUpdate
			 * 父 componentDidUpdate
             * -----------------------------------------------------
             * 1.初始化组件
			 */
             import {Component} from 'react'
class Child extends Component {
    //第2个及以后的渲染调用，会调用此方法
    componentWillReceiveProps(nextProps) {
        console.log(
            `子`,
            '组件传入的Prop属性发生了改变',
            nextProps
        );
    }
    //组件的渲染,控制
    shouldComponentUpdate() {
        console.log(`子`, 'shouldComponentUpdate');
        return true;
    }
    componentWillUpdate() {
        //组件将要更新
        console.log(`子`, 'componentWillUpdate');
    }
    componentDidUpdate() {
        //组件更新完成
        console.log(`子`, 'componentDidUpdate');
    }
    render() {
        console.log(`子`, 'render');
        return (
            <div>
                <h1>我是子组件</h1>
                <p>姓名：{this.props.name}</p>
                <p>年龄：{this.props.age}</p>
            </div>
        );
    }
}

export default class  Father extends Component {
    state = {
        name: '小明',
        age: '1',
        count: 0
    };
    setData = () => {
        this.setState({
            name: '小雅',
            age: '26'
        });
    };
    force = () => {
        this.forceUpdate();
    };
    //组件的渲染,控制
    shouldComponentUpdate() {
        console.log(`父`, 'shouldComponentUpdate');
        return true;
    }
    componentWillUpdate() {
        //组件将要更新
        console.log(`父`, 'componentWillUpdate');
    }
    componentDidUpdate() {
        //组件更新完成
        console.log(`父`, 'componentDidUpdate');
    }
    render() {
        console.log('父render');
        return (
            <div className='abc'>
                <h1>我是父组件</h1>
                <button onClick={this.setData}>改一下</button>
                <button onClick={this.force}>强制更新</button>
                <Child
                    name={this.state.name}
                    age={this.state.age}
                />
            </div>
        );
    }
}