<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0 cartPanel" flat>
            <div v-if="cartEmpty" style="background: white; width: 100%">
                <v-img src="../assets/empty-cart.1bfda269.png"></v-img>
                <h3 class="montserrat text-center" style="color: #f06292">Carrito vacío, Vamos de compras!</h3>
            </div>
            <div v-if="!cartEmpty">
                <div v-for="items in cart">
                    {{items}}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";

    export default {
        name: "Cart",
        components: {
            Toolbar, BottomMenu
        },
        data() {
            return {
                cartEmpty: true,
                cart: []
            }
        },
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }
        },
        activated() {
            if(localStorage.getItem('cart')){
                this.cart = JSON.parse(localStorage.getItem('cart'));
                this.cartEmpty = false;
            }else{
                this.cartEmpty = true;
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>