const {createRoot} =ReactDOM
//import HelloRef from './refs.jsx'
//import LifeNew from './lifeNew.jsx'
//import Life from './life.jsx'
//import StateClass from './StateClass.jsx'
import Father from "./fatherChild.jsx"
const root = createRoot(document.getElementById('test'))
root.render(<Father/>)