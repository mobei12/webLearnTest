import store,{EventEnum} from './store'
const plusDom = document.getElementById('plus');
const minusDom = document.getElementById('minus');
const showDom = document.getElementById('content')


const init = function () {
    Render()
    bindEvent();
}
store.subscribe(()=>{
    Render()
})
/* const state ={
    count: 0
} */

const handlerEvent = function (type) {
   store.dispatch({type})
}
function Render(){
    const state = store.getState()
    showDom.innerHTML = state.count
}
function bindEvent() {
    plusDom.addEventListener('click', () => { handlerEvent(EventEnum.PLUS) }, false);
    minusDom.addEventListener('click', () => { handlerEvent(EventEnum.MINUS) }, false);
}
init()