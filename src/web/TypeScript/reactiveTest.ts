import reactive from './reactive.js'
const dataObserver = reactive({ name: '12', age: 123 })
console.log(123)
dataObserver.on('nameUpdate', (nVal, oVal) => {
    console.log(`name---`, nVal, oVal)
})
dataObserver.on('ageUpdate', (o, n) => {
    console.log(`age---`, o, n)
})

setTimeout(() => {
    dataObserver.state.name = 'nameNew'
    dataObserver.state.age = 456
}, 100);
let root: HTMLDivElement = document.querySelector('#app') as HTMLDivElement
root.innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button">${dataObserver.state.name}</button>
    </div>
  </div>
`;