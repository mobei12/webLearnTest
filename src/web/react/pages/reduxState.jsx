import store from "../store"
import { counterAction } from "../store/action"
import {useCounterHook} from '../hooks/useCustomHook'
const reduxState = ()=>{
    const {dispatch} = store
    const count = useCounterHook()
    return(
        <div>
            <h2>count:{count}</h2>
            <button onClick={() => dispatch(counterAction({type:'PLUS',payload:1}))}>add</button>
            <button onClick={() => dispatch(counterAction({type:'MINUS',payload:1}))}>--</button>
        </div>
    )
}
export default reduxState