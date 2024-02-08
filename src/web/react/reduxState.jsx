import { useState,useEffect } from "react"
import store from "./store"
import { counterAction } from "./store/action"
const reduxState = ()=>{
    const {getState,dispatch,subscribe} = store
    const [count,setCount] = useState(getState().counter.count)
    useEffect(()=>{
        const unsubscribe =  subscribe(()=>{
            setCount(getState().counter.count)
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    return(
        <div>
            <h2>count:{count}</h2>
            <button onClick={() => dispatch(counterAction({type:'PLUS',payload:1}))}>add</button>
            <button onClick={() => dispatch(counterAction({type:'MINUS',payload:1}))}>--</button>
        </div>
    )
}
export default reduxState