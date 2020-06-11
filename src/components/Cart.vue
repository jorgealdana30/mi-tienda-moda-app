<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0 cartPanel" flat>
            <div style="background: white; width: 100%">
                <v-img src="../assets/empty-cart.1bfda269.png"></v-img>
                <h3 class="montserrat text-center" style="color: #f06292">Carrito vacío, Vamos de compras!</h3>
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
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

</style>