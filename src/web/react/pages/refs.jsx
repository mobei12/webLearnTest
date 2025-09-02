import { Component, createRef } from 'react';

export default class HelloRef extends Component {
    constructor() {
        super();
        // 推荐方式：用 createRef()
        this.inputRef = createRef();
        this.hshowRef = createRef();
        this.textInputRef = createRef();
    }

    focusTextInput = () => {
        if (this.textInputRef.current) {
            this.textInputRef.current.focus();
            this.textInputRef.current.value = '获取焦点了';
        }
    };

    changeState = () => {
        if (this.inputRef.current) {
            this.inputRef.current.value = '我是变化后的值';
        }
    };

    componentDidMount() {
        this.focusTextInput();
    }

    render() {
        return (
            <div>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="点一哈就变化"
                />
                <button onClick={this.changeState}>点击变化</button>

                <input
                    type="text"
                    onBlur={e => {
                        if (this.hshowRef.current) {
                            this.hshowRef.current.innerText = e.currentTarget.value;
                        }
                    }}
                    placeholder="失去焦点就变化"
                />

                <input
                    type="text"
                    onChange={e => {
                        if (this.hshowRef.current) {
                            this.hshowRef.current.innerText = e.currentTarget.value;
                        }
                    }}
                    placeholder="变改变边变化"
                />

                <h1 ref={this.hshowRef}></h1>

                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />

                <input
                    type="text"
                    ref={this.textInputRef} // 新式 ref
                />
            </div>
        );
    }
}
