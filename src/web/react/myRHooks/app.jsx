import { root, useState, useReducer, useEffect, useMemo, useCallback } from "./React"
let t = null
function reducer(state, action) {
    if (action.type === 'incremented_age') {
        return {
            age: state.age + 1
        };
    }
    throw Error('Unknown action.');
}
const Child = ({ onSubmit, age }) => {
    const onclickHandle = (e) => {
        e.preventDefault();
        onSubmit()
    }
    return (
        <div>
            <h2>child 组件</h2>
            <span>{age}</span>
            <button onClick={(e) => onclickHandle(e)} >点一下</button>
        </div>
    )
}
function App() {
    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    const [state, dispatch] = useReducer(reducer, { age: 42 }, (initVal) => Object.assign(initVal, { age: 12 }));
    useEffect(() => {
        console.log(`useEffect log count:${count}`)
    }, [count1, count])
    useEffect(() => {
        console.log(`useEffect log count1:${count1}`)
    }, [count1])
    const memoVal = useMemo(() => { return count * 10 }, [count, count1])
    function handleClick() {
        setTimeout(() => {
            console.log(`handleClick log count:${count}`)
        }, 1000);
    }
    const h = useCallback(handleClick, [count])
    return (
        <div >
            <h2>{count}useState</h2>
            <button onClick={() => setCount(count + 1)}>count++</button>
            <button onClick={() => setCount(count - 1)}>count--</button>
            <h2>{count1}useState</h2>
            <button onClick={() => setCount1(count1 + 1)}>count1++</button>
            <button onClick={() => setCount1(count1 - 1)}>count1--</button>
            <h2>{state.age}reducer</h2>
            <button onClick={() => dispatch({ type: 'incremented_age' })}>incremented_age--</button>
            <h2>{memoVal}memoVal = count*10</h2>
            <hr />
            <Child onSubmit={h} age='23' />
        </div>
    )
}

root.render(<App />)
export default App