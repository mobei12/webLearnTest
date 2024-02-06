import {Component} from 'react'
export default class StateClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false
        };
        this.changeState = this.changeState.bind(this);
    }
    render() {
        const { isChange } = this.state;
        return (
            <div
                className='abc'
                onClick={this.changeState}
                style={{
                    backgroundColor: isChange ? 'skyBlue' : 'gray'
                }}
            >{`Hello:${isChange ? '在改一下' : '改一下'}颜色`}</div>
        );
    }
    changeState() {
        console.log(this);
        const { isChange } = this.state;
        this.setState({
            isChange: !isChange
        });
    }
}
