import {createRoot} from 'react-dom/client'
import ReduxState from '@/web/React/reduxState.jsx'
/* import HelloRef from './refs.jsx'
import LifeNew from './lifeNew.jsx'
import Life from './life.jsx'
import StateClass from './StateClass.jsx'
import Father from "./fatherChild.jsx" */
import Game from './game.jsx'

function App() {
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',fontSize: '20px'}}>
            <ReduxState/>
            <Game/>
             {/*<HelloRef/>
            <LifeNew/>
            <Life/>
            <StateClass/>
            <Father/> */}
        </div>
    )
}
const root = createRoot(document.getElementById('test'))
root.render(<App/>)