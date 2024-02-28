import { createVue, ref } from './main.js'
createVue("#app", {
    refs: {
        name: ref('张三'),
        age: ref(18),
    },
    methods: {
        changeName() {
            this.name.value = '李四'
        },
        reset() {
            this.name.$reset()
        }

    }
})
