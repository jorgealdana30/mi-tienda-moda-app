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
                                <v-btn icon color="blue" @click="preCart(items)">
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
                    </v-card>
                </div>
                <v-card class="mb-2">
                    <h2 class="montserrat d-flex justify-end">Subtotal: <span class="ml-2 mr-4" style="color: #f06292;">${{subtotal.toFixed(2)}}</span>
                    </h2>
                </v-card>
                <v-dialog v-model="selectVariant" persistent>
                    <v-card>
                        <v-card-title class="mb-1 pb-4" style="background-color: #f06292">
                            <v-btn icon text @click="closeClear">
                                <v-icon color="white">
                                    mdi-close
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title>
                                <span class="white--text ml-4">Editar Producto</span>
                            </v-toolbar-title>
                        </v-card-title>
                        <v-card-text>
                            <div class="d-flex flex-column">
                            <span class="montserrat font-weight-bold"
                                  style="color: #f06292;">Selecciona el Tamaño</span>
                                <div class="d-flex justify-center flex-row">
                                    <v-select :items="variantsList" v-model="sizeSelected" v-on:change="selectQuantity">
                                    </v-select>
                                </div>
                            </div>
                            <div v-if="enableQuantity">
                            <span class="montserrat font-weight-bold"
                                  style="color: #f06292;">Selecciona la cantidad</span>
                                <v-select :items="quantityList" v-model="quantitySelected" v-on:change="processProduct">
                                </v-select>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="saveToCart">
                                Agregar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    import vuex from 'vuex'
    export default {
        name: "Cart",
        components: {
            Toolbar, BottomMenu
        },

        data() {
            return {
                cartEmpty: true,
                cart: [],
                selectVariant: false,
                variantsList: [],
                quantityList: [],
                enableQuantity: false,
                productSelected: null,
                sizeSelected: '',
                quantitySelected: '',
            }
        },
        computed: {
            subtotal() {
                let suma = 0;
                for (let i in this.cart) {
                    suma = Number(suma) + Number((this.cart[i].price * this.cart[i].quantity).toFixed(2))
                }
                return suma
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
                this.cartEmpty = this.cart.length === 0;
            } else {
                this.cartEmpty = true;
            }
        },
        deactivated() {
            this.closeClear()
        },
        methods: {
            preCart(product) {
                this.selectVariant = true;
                this.productSelected = product;
                for (let i in this.productSelected.variants) {
                    this.variantsList.push(this.productSelected.variants[i].size);
                }
            },
            deleteItems(item) {
                for (let i in this.cart) {
                    if (item.id === this.cart[i].id) {
                        this.cart.splice(i);
                    }
                }
                this.cartEmpty = this.cart.length === 0;
                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.$store.commit("quantityMap");
            },
            selectQuantity() {
                this.enableQuantity = true;
                for (let i in this.productSelected.variants) {
                    if (this.sizeSelected === this.productSelected.variants[i].size) {
                        for (let j = 1; j <= this.productSelected.variants[i].quantity; j++) {
                            this.quantityList.push(j)
                        }
                    }
                }
            },
            processProduct() {
                let productTemp = this.productSelected;
                for (let i in productTemp.variants) {
                    if (this.sizeSelected === productTemp.variants[i].size) {
                        productTemp.quantity = this.quantitySelected;
                        productTemp['variant'] = productTemp.variants[i];
                    }
                }
            },
            saveToCart() {
                if (localStorage.getItem('cart')) {
                    let json = [];
                    json = JSON.parse(localStorage.getItem('cart'));
                    for (let i in json) {
                        if (json[i].id === this.productSelected.id) {
                            json.splice(i);
                        }
                    }
                    json.push(this.productSelected);
                    localStorage.setItem('cart', JSON.stringify(json));
                } else {
                    let json = [];
                    json.push(this.productSelected);
                    localStorage.setItem('cart', JSON.stringify(json));
                }
                this.$store.commit("quantityMap");
                this.closeClear();
            },
            closeClear() {
                this.selectVariant = false;
                this.enableQuantity = false;
                this.quantitySelected = null;
                this.productSelected = null;
                this.sizeSelected = '';
                this.quantityList = [];
                this.variantsList = [];
            }
        }
    }
</script>

<style scoped>

</style>