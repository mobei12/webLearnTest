const {Component} = React
export default class HelloRef extends Component {
    constructor() {
        super();
        this.focusTextInput = element => {
            if (this.textInput) {
                this.textInput.focus();
                this.textInput.value = '获取焦点了';
            }
        };
    }
    changeState = () => {
        this.refs.input.value = '我是变化后的值';
    };
    componentDidMount() {
        this.focusTextInput();
    }
    render() {
        return (
            <div>
                <input
                    ref='input'
                    type='text'
                    placeholder='点一哈就变化'
                />
                <button onClick={this.changeState}>点击变化</button>
                <input
                    type='text'
                    onBlur={e => {
                        if (e.currentTarget === e.target) {
                            this.refs.hshow.innerText =
                                e.currentTarget.value;
                        } else {
                            console.log(
                                'unfocused child',
                                e.target
                            );
                        }
                    }}
                    placeholder='失去焦点就变化'
                />
                <input
                    type='text'
                    onChange={e => {
                        if (e.currentTarget === e.target) {
                            this.refs.hshow.innerText =
                                e.currentTarget.value;
                        } else {
                            console.log(
                                'unfocused child',
                                e.target
                            );
                        }
                    }}
                    placeholder='变改变边变化'
                />
                <h1 ref='hshow'></h1>
                <input
                    type='button'
                    value='Focus the text input'
                    onClick={this.focusTextInput}
                />
                <input
                    type='text'
                    ref={el => {
                        console.log(el);
                        this.textInput = el;
                    }} /* 回调式的ref */
                />
            </div>
        );
    }
}
