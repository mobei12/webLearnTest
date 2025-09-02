import ReduxState from '../pages/reduxState.jsx'
import HelloRef from '../pages/refs.jsx'
import LifeNew from '../pages/lifeNew.jsx'
import Life from '../pages/life.jsx'
import StateClass from '../pages/StateClass.jsx'
import Game from '../pages/game/'
import Father from "../pages/fatherChild.jsx"
import ShowList from '../pages/showList.jsx'
import Welcome from '../pages/Welcome/index.jsx'
import Test from "../pages/test.jsx";

// 使用Vite的?raw功能导入源代码
import ReduxStateCode from '../pages/reduxState.jsx?raw'
import HelloRefCode from '../pages/refs.jsx?raw'
import LifeNewCode from '../pages/lifeNew.jsx?raw'
import LifeCode from '../pages/life.jsx?raw'
import StateClassCode from '../pages/StateClass.jsx?raw'
import GameCode from '../pages/game/index.jsx?raw'
import FatherCode from "../pages/fatherChild.jsx?raw"
import ShowListCode from '../pages/showList.jsx?raw'
import WelcomeCode from '../pages/Welcome/index.jsx?raw'
import TestCode from "../pages/test.jsx?raw";
export const menus = [
    {
        name:'ReduxState',
        path:'/redux-state',
        component:ReduxState,
        sourceCode: ReduxStateCode
    },{
        name:'HelloRef',
        path:'/hello-ref',
        component:HelloRef,
        sourceCode: HelloRefCode
    },{
        name:'LifeNew',
        path:'/life-new',
        component:LifeNew,
        sourceCode: LifeNewCode
    },{
        name:'Life',
        path:'/life',
        component:Life,
        sourceCode: LifeCode
    },{
        name:'StateClass',
        path:'/state-class',
        component:StateClass,
        sourceCode: StateClassCode
    },{
        name:'Game',
        path:'/game',
        component:Game,
        sourceCode: GameCode
    },{
        name:'Father',
        path:'/father',
        component:Father,
        sourceCode: FatherCode
    },{
        name:'ShowList',
        path:'/show-list',
        component:ShowList,
        sourceCode: ShowListCode
    },{
        name:'Welcome',
        path:'/welcome',
        component:Welcome,
        sourceCode: WelcomeCode
    },{
        name:'Test',
        path:'/test',
        component:Test,
        sourceCode: TestCode
    }
]