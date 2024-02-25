import { Component } from "react"
import axios from 'axios'
export default class POST extends Component {
    state = {
        data: [],
        component: this.props.loading || ''
    }
    async componentDidMount() {
        //解构传入的属性
        const { url, children, delay ,condition,dataOperate} = this.props
        try {
            const result = await axios.post(url,condition)
            this.setState({
                data: dataOperate(result.data)
            }, () => {
                setTimeout(() => {
                    this.setState({
                        component: children(this.state.data)
                    })
                }, delay | 0);
            })
        } catch (error) {
        }

    }
    render() {
        return this.state.component
    }
}