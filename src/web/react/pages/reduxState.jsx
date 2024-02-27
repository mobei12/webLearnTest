import { useCounterHook } from '../hooks/useCustomHook'
const reduxState = ()=>{
    const [count,{increment,decrement}] = useCounterHook(10)
    return(
        <div>
            <h2>count:{count}</h2>
            <button onClick={e=>increment(1)}>add</button>
            <button onClick={e=>decrement(1)}>--</button>
        </div>
    )
}
export default reduxState