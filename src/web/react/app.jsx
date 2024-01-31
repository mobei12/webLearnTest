const {createRoot} =ReactDOM
import HelloRef from './refs.jsx'
import LifeNew from './lifeNew.jsx'
//import Life from './life.jsx'
const root = createRoot(document.getElementById('test'))
root.render(<LifeNew/>)