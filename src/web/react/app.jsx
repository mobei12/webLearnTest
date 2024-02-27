import { createRoot } from 'react-dom/client'
 /*import ReduxState from './pages/reduxState.jsx'
import HelloRef from './pages/refs.jsx'
import LifeNew from './pages/lifeNew.jsx'
import Life from './pages/life.jsx'
import StateClass from './pages/StateClass.jsx'
import Father from "./pages/fatherChild.jsx"
import Game from './pages/game/'*/
//import ShowList from './pages/showList.jsx'
import IntermittentTimer from './pages/intermittentTimer/index.jsx'

function App() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', fontSize: '20px' }}>
            {/*<ReduxState/>
             <ReduxState/>
            <Game/>
             <HelloRef/>
            <LifeNew/>
            <Life/>
            <StateClass/>
            <Father/> 
            <ShowList/>*/}
            <IntermittentTimer />

        </div>
    )
}
const root = createRoot(document.getElementById('test'))
root.render(<App />)