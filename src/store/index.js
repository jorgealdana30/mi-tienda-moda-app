import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tabIndex: 0,
        quantity: 0
    },
    mutations: {
        moveTab(state, payload) {
            state.tabIndex = payload.number;
            //router.push({name: 'Board', path: payload.url}).then(r => {})
        },
        quantityMap(state){
            let suma = 0;
            if (localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
                if (this.cart.length >= 1) {
                    for (let i in this.cart) {
                        suma = suma + this.cart[i].quantity
                    }
                }
            }
            state.quantity = suma;
        }
    },
    actions: {},
    modules: {}
})
