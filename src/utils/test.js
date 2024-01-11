const { wholeDeepClone } = require('./index')
const target = {
    name: 123,
    Array: [1, 2, 3],
    obj:{
        depName:'dep'
    }
}
const newO = wholeDeepClone(target)
newO.name = 12312
newO.Array = 12312
newO.obj.depName = 12312
console.log(target,newO)