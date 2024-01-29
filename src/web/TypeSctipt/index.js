import reactive from './reactive.js'
const dataObserver = reactive({ name: '12' })

dataObserver.on('nameUpdate', (nVal,oVal) => {
    console.log(nVal,oVal)
})

setTimeout(() => {
    dataObserver.state.name = 'nameNew'
},100)