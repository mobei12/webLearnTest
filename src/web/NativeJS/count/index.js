import store,{EventEnum} from './store'
const plusDom = document.getElementById('plus');
const minusDom = document.getElementById('minus');
const showDom = document.getElementById('content')


const init = function () {
    Render()
    bindEvent();
}
//订阅数据更新，并调用回掉函数
store.subscribe(()=>{
    Render()
})
/* const state ={
    count: 0
} */
//推送事件更新
const handlerEvent = function (type) {
   store.dispatch({type})//通知变化
}
/**
 * 用于将状态计数呈现到DOM的函数。
 *
 */
function Render(){
    const state = store.getState()
    showDom.innerHTML = state.count
}
function bindEvent() {
    plusDom.addEventListener('click', () => { handlerEvent(EventEnum.PLUS) }, false);
    minusDom.addEventListener('click', () => { handlerEvent(EventEnum.MINUS) }, false);
}
init()