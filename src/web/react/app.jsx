const {createRoot} =ReactDOM
import HelloRef from './refs.jsx'
import LifeNew from './lifeNew.jsx'
import Life from './life.jsx'
import StateClass from './StateClass.jsx'
import Father from "./fatherChild.jsx"
function App() {
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)'}}>
            <HelloRef/>
            <LifeNew/>
            <Life/>
            <StateClass/>
            <Father/>
        </div>
    )
}
const root = createRoot(document.getElementById('test'))
root.render(<App/>)