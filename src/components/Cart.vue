<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0 cartPanel" height="auto" color="primary" flat>
            <div v-if="cartEmpty" style="background: white; width: 100%">
                <v-img src="../assets/empty-cart.1bfda269.png"></v-img>
                <h3 class="montserrat text-center" style="color: #f06292">Carrito vacío, Vamos de compras!</h3>
            </div>
            <div v-if="!cartEmpty">
                <div v-for="items in cart">
                    <v-card class="d-flex flex-row mt-2 mb-2" width="23rem">
                        <v-card-title>
                            <v-img style="margin-left: 0" :src="'https://api.tissini.app'+items.images[0].url"
                                   max-width="10rem"></v-img>
                        </v-card-title>
                        <v-card-text class="flex-column d-flex mt-3">
                            <h3 class="font-weight-bold mb-2" style="color: #f06292">{{items.name}}</h3>
                            <span>SKU: <b>{{items.variant.sku}}</b></span>
                            <span>Talla: <b>{{items.variant.size}}</b></span>
                            <span>Cantidad: <b>{{items.quantity}}</b></span>
                            <span>Unidad: <b>${{items.price}}</b></span>
                            <h2 class="mt-1" style="color: #f06292">${{(items.price * items.quantity).toFixed(2)}}</h2>
                            <v-divider class="mt-2 mb-2"></v-divider>
                            <div class="d-flex justify-space-around">
                                <v-btn icon color="blue">
                                    <v-icon>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn icon color="red" @click="deleteItems(items)">
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column">

                        </v-card-actions>
                    </v-card>
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
            if (localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
                this.cartEmpty = false;
            } else {
                this.cartEmpty = true;
            }
        },
        methods: {
            deleteItems(item) {
                for (let i in this.cart) {
                    if (item.id === this.cart[i].id) {
                        this.cart.splice(i);
                    }
                }
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }
        }
    }
</script>

<style scoped>

</style>