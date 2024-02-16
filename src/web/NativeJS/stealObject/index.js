const api = (() => {
    const fields = {
        USER_LIST: '/user_list',
        USER_LIST1: '/user_list1',
    }
    return {
        get(key) {
            return fields[key]
        }
    }
})();
// 定义一个get方法，返回对象本身，而不是原型链，以便于调用，如下
Object.defineProperty(Object.prototype,'getOrigin',{
    get(){
        return this
    }
})
const url = api.get('getOrigin')
console.log(url)