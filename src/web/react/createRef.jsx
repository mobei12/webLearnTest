import {Component,createRef} from 'react';
export default class HelloRef extends Component {
    testRef = createRef();
    showData = () => {
        console.log(this);
        console.log(this.testRef.current.value);
    };
    render() {
        return (
            <div>
                <input
                    type='text'
                    ref={this.testRef}
                    placeholder='点哈'
                />
                <button onClick={this.showData}>再点</button>
            </div>
        );
    }
}