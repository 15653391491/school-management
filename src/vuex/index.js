import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
    state: {
        name: '',
        count: 0,
        token: '',
        indexPath: ['用户管理','/adminSetting']
    },
    plugins: [createPersistedState()],
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