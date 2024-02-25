import { Component } from "react"
import axios from 'axios'
export default class Get extends Component {
    state = {
        data: [],
        component: this.props.loading || ''
    }
    async componentDidMount() {
        //解构传入的属性
        const { url, children, delay, error } = this.props
        try {
            const result = await axios.get(url)
            this.setState({
                data: result.data
            }, () => {
                setTimeout(() => {
                    this.setState({
                        component: children(this.state.data)
                    })
                }, delay | 0);

            })
        } catch (e) {
            this.setState({
                component: error || 'error'
            })
            throw e
        }

    }
    render() {
        return this.state.component
    }
}