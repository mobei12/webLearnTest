import { lazy } from 'react';

// 动态导入组件，实现代码分割和懒加载
const ReduxState = lazy(() => import('../pages/reduxState.jsx'));
const HelloRef = lazy(() => import('../pages/refs.jsx'));
const LifeNew = lazy(() => import('../pages/lifeNew.jsx'));
const Life = lazy(() => import('../pages/life.jsx'));
const StateClass = lazy(() => import('../pages/StateClass.jsx'));
const Game = lazy(() => import('../pages/game/'));
const Father = lazy(() => import('../pages/fatherChild.jsx'));
const ShowList = lazy(() => import('../pages/showList.jsx'));
const Welcome = lazy(() => import('../pages/Welcome/index.jsx'));
const Test = lazy(() => import('../pages/test.jsx'));

// 组件路径映射，用于动态加载源代码
const componentSourceMap = {
  '/redux-state': () => import('../pages/reduxState.jsx?raw'),
  '/hello-ref': () => import('../pages/refs.jsx?raw'),
  '/life-new': () => import('../pages/lifeNew.jsx?raw'),
  '/life': () => import('../pages/life.jsx?raw'),
  '/state-class': () => import('../pages/StateClass.jsx?raw'),
  '/game': () => import('../pages/game/index.jsx?raw'),
  '/father': () => import('../pages/fatherChild.jsx?raw'),
  '/show-list': () => import('../pages/showList.jsx?raw'),
  '/welcome': () => import('../pages/Welcome/index.jsx?raw'),
  '/test': () => import('../pages/test.jsx?raw')
};
export const menus = [
    {
        name:'ReduxState',
        path:'/redux-state',
        component:ReduxState,
        getSourceCode: componentSourceMap['/redux-state']
    },{
        name:'HelloRef',
        path:'/hello-ref',
        component:HelloRef,
        getSourceCode: componentSourceMap['/hello-ref']
    },{
        name:'LifeNew',
        path:'/life-new',
        component:LifeNew,
        getSourceCode: componentSourceMap['/life-new']
    },{
        name:'Life',
        path:'/life',
        component:Life,
        getSourceCode: componentSourceMap['/life']
    },{
        name:'StateClass',
        path:'/state-class',
        component:StateClass,
        getSourceCode: componentSourceMap['/state-class']
    },{
        name:'Game',
        path:'/game',
        component:Game,
        getSourceCode: componentSourceMap['/game']
    },{
        name:'Father',
        path:'/father',
        component:Father,
        getSourceCode: componentSourceMap['/father']
    },{
        name:'ShowList',
        path:'/show-list',
        component:ShowList,
        getSourceCode: componentSourceMap['/show-list']
    },{
        name:'Welcome',
        path:'/welcome',
        component:Welcome,
        getSourceCode: componentSourceMap['/welcome']
    },{
        name:'Test',
        path:'/test',
        component:Test,
        getSourceCode: componentSourceMap['/test']
    }
]