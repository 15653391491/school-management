import {createStore} from 'vuex'

export const store = createStore({
    state: {
        name: '',
        count: 0,
        token: '',
        indexPath: []
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
        },
        setIndexPath(state, data) {
            state.indexPath = data
        }
    },
})