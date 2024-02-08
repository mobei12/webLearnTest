import { createStore,applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'//redux-thunk 的作用是延迟 dispatch，使得你可以在 action creators 中执行异步操作，例如发起网络请求，然后在异步操作完成后再 dispatch 同步的 action。这种方式可以让你更灵活地处理异步逻辑，同时保持 Redux 的一致性和可预测性。
//redux 配置插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))