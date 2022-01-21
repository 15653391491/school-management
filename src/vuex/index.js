import {createStore} from 'vuex'

export const store = createStore({
    state: {
        name: '',
        count: 0,
        token: ''
    },
    mutations: {
        setName(state, data) {
            state.name = data
        },
        addCount(state) {
            state.count++
        },
        setToken(state, data) {
            state.token = data
        }
    },
})