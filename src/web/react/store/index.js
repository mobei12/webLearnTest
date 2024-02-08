import { createStore,applyMiddleware } from 'redux'
import reducers from './reducers'
//redux 配置插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers,composeEnhancers(applyMiddleware()))