# Redux Count Reducer

该 reducer 管理应用程序中的计数状态。初始状态为 `{ count: 1 }`。

## Reducer 功能

- 响应 `EXAMPLE_ACTION` 动作类型，更新计数值。
- 提供了一个初始状态，即 `{ count: 1 }`。

## 使用

### 安装

```bash
npm install redux  redux-thunk -D
```
### 配置store/js
```js
// store.js
import { createStore,applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import reducers from './reducers'//redux-thunk 的作用是
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers,composeEnhancers(applyMiddleware(thunk)))
```
##  访问计数值
```js
// react component
import store from 'store';
const countValue = store.getState().count;
console.log('当前计数值:', countValue);
// 分发动作来更新计数值
store.dispatch({ type: 'EXAMPLE_ACTION', payload: 42 });
```
## Reducer 函数
```js
// countReducer.js
import { EXAMPLE_ACTION } from '../actions/actionTypes';
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      // 响应 EXAMPLE_ACTION 动作类型
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default countReducer;
