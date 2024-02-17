let p = new Object()
p.name = '123'
p.showName = function () {
    console.log(this.name)
}
let temp = Object.getOwnPropertyDescriptor(p, 'name')
console.log(temp)