import { root,useState } from "./React"
let t = null
function App() {
    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',fontSize: '20px'}}>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>count++</button>
            <button onClick={() => setCount(count - 1)}>count--</button>
            <h2>{count1}</h2>
            <button onClick={() => setCount1(count1 + 1)}>count1++</button>
            <button onClick={() => setCount1(count1 - 1)}>count1--</button>
        </div>
    )
}
root.render(<App/>)
export default App