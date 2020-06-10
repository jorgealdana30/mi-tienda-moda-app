import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tabIndex: 0
    },
    mutations: {
        moveTab(state, payload) {
            state.tabIndex = payload.number;
            //router.push({name: 'Board', path: payload.url}).then(r => {})
        },
    },
    actions: {},
    modules: {}
})
