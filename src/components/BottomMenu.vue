<template>
    <v-bottom-navigation
            app
            fixed
            :value="tabIndex"
            grow
            color="primary"
    >
        <v-btn :to="{name: 'Categories'}">
            <span class="montserrat">Categorias</span>
            <v-icon>mdi-home-outline</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Catalogue'}">
            <span class="montserrat">Catalogo</span>
            <v-icon>mdi-badge-account-outline</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Cart'}">
            <span class="montserrat">Carrito</span>
            <v-badge
                    :content="quantity"
                    :value="quantity"
                    color="primary"

            >
                <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        name: "BottomMenu",
        data() {
            return {
                activeBtn: 0,
                cart: []
            }
        },
        computed: {
            ...Vuex.mapState(["tabIndex", "quantity"]),
        },
        methods: {
            ...Vuex.mapMutations(["moveTab", "quantityMap"]),
        }
    }
</script>

<style scoped>

</style>