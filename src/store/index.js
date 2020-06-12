import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tabIndex: 0,
        quantity: 0,
        cartBadgeAnim: ''
    },
    mutations: {
        moveTab(state, payload) {
            state.tabIndex = payload.number;
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
        },
        shake(state, payload){
            state.cartBadgeAnim = payload.ir
        },
        clearShake(state){
            state.cartBadgeAnim = ''
        }
    },
    actions: {},
    modules: {}
})
