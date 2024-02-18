import { root, useState, useReducer, useEffect } from "./React"
let t = null
function reducer(state, action) {
    if (action.type === 'incremented_age') {
        return {
            age: state.age + 1
        };
    }
    throw Error('Unknown action.');
}
function App() {
    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    const [state, dispatch] = useReducer(reducer, { age: 42 }, (initVal) => Object.assign(initVal, { age: 12 }));
    useEffect(() => {
        console.log(count1)
    }, [])
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
        </div>
    )
}
root.render(<App />)
export default App