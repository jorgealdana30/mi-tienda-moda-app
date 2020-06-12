<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0" flat height="auto" color="primary">
            <Autocomplete/>
            <v-card class="subCard d-flex justify-center" v-if="!hasCategory" style="height: auto; width: 100vw"
                    elevation="2">
                <v-card-title>
                    <span class="montserrat" v-if="category.categories">{{category.categories.name}}</span>
                </v-card-title>
            </v-card>
            <v-card class="subCard" v-if="hasCategory" style="height: auto; width: 100vw" elevation="2">
                <v-card-title>
                    <span class="montserrat">CATEGORÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-carousel height="auto" hide-delimiters hide-delimiter-background
                                show-arrows-on-hover v-if="category.categories">
                        <v-carousel-item v-for="item in category.categories">
                            <img :src="'https://api.tissini.app'+ item.image"
                                  class="categoryCatalogueImg">
                        </v-carousel-item>
                    </v-carousel>
                </v-card-text>
            </v-card>
            <div v-infinite-scroll="loadProducts" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
                <div v-for="item in products">
                    <v-card class="subCard" ref="table" v-if="Object.keys(item.images).length>1"
                            style="height: auto"
                            elevation="2">
                        <v-lazy :options="{threshold: .5}"
                                min-height="200" :transition="transition" v-model="isActive">
                            <div>
                                <v-card-title>
                                    <v-carousel height="auto"
                                                :show-arrows="Object.keys(item.images).length>1">
                                        <v-carousel-item v-for="photos in item.images">
                                            <img class="imgCategory" :src="'https://api.tissini.app/'+ photos.url">
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-card-title>
                                <v-card-text>
                                    <v-list color="primary">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title style="margin-top: -10px!important;"
                                                                   class="mt-1 mb-1 white--text font-weight-bold">
                                                    {{item.name}}
                                                </v-list-item-title>
                                                <v-list-item-subtitle class="mt-1 white--text">${{item.price}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-btn rounded @click="preCart(item)">
                                                    <v-icon>mdi-cart-plus</v-icon>
                                                    Agregar
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </div>
                        </v-lazy>
                    </v-card>
                    <v-card class="subCard" ref="table" v-if="Object.keys(item.images).length===0"
                            style="height: auto"
                            elevation="2">
                        <v-lazy :options="{threshold: .5}"
                                min-height="200" :transition="transition" v-model="isActive">
                            <div>
                                <v-card-title>
                                    <img class="imgCategory"
                                         src="https://api.tissini.app/img/products/not_found.jpg">
                                </v-card-title>
                                <v-card-text>
                                    <v-list color="primary">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title style="margin-top: -10px!important;"
                                                                   class="mt-1 mb-1 white--text font-weight-bold">
                                                    {{item.name}}
                                                </v-list-item-title>
                                                <v-list-item-subtitle class="mt-1 white--text">${{item.price}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-btn rounded @click="preCart(item)">
                                                    <v-icon>mdi-cart-plus</v-icon>
                                                    Agregar
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </div>
                        </v-lazy>
                    </v-card>
                </div>
            </div>
            <v-dialog
                    v-model="busy"
                    persistent
                    width="300"
            >
                <v-card
                        color="primary"
                        dark
                >
                    <v-card-text class="d-flex align-center flex-column">
                        <span class="mt-3">Cargando, por favor espere...</span>
                        <v-img src="../assets/loader.126f8cbb.gif" width="10vw"></v-img>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="selectVariant" persistent>
                <v-card>
                    <v-card-title class="mb-1 pb-4" style="background-color: #f06292">
                        <v-btn icon text @click="closeClear">
                            <v-icon color="white">
                                mdi-close
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            <span class="white--text ml-4">Agregar Producto</span>
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
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    import Autocomplete from "./Autocomplete";
    import axios from 'axios'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        name: "Catalogue",
        components: {
            Toolbar, BottomMenu, Autocomplete
        },
        directives: {infiniteScroll},
        data() {
            return {
                category: [],
                busy: false,
                products: [],
                isActive: true,
                categoryName: '',
                loading: true,
                transition: 'fade-transition',
                hasCategory: true,
                selectVariant: false,
                variantsList: [],
                quantityList: [],
                enableQuantity: false,
                productSelected: null,
                sizeSelected: '',
                quantitySelected: '',
                limit: 10,
                busy: false,
                visited: false
            }
        },
        activated() {
            this.category = JSON.parse(localStorage.getItem('categorySelected'));
            this.loadProducts();
            this.visited = false
        },
        deactivated() {
            this.products = [];
            this.category = null;
            this.busy = false;
            this.closeClear()
        },
        methods: {
            loadProducts() {
                let id = 0;
                if(this.category!==null){
                    this.busy = true;
                    if (this.category.hasOwnProperty('category_id')) {
                        id = this.category.category_id;
                        this.hasCategory = false
                    } else {
                        id = this.category.id;
                        this.hasCategory = true
                    }
                    axios.get('https://api.tissini.app/api/v2/categories/' + id + '/products').then(response => {
                            const append = response.data.products.slice(
                                this.products.length,
                                this.products.length + this.limit
                            );
                            this.products = this.products.concat(append);
                            console.log(this.products);
                            this.busy = false;
                        }
                    ).catch(() => {
                        this.busy = false;
                    });
                    this.visited = true;
                }

            },
            preCart(product) {
                this.selectVariant = true;
                this.productSelected = product;
                for (let i in this.productSelected.variants) {
                    this.variantsList.push(this.productSelected.variants[i].size);
                }
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
                        productTemp['quantity'] = this.quantitySelected;
                        productTemp['variant'] = productTemp.variants[i];
                    }
                }
            },
            saveToCart() {
                if (localStorage.getItem('cart')) {
                    let json = [];
                    json = JSON.parse(localStorage.getItem('cart'));
                    json.push(this.productSelected);
                    localStorage.setItem('cart', JSON.stringify(json));
                } else {
                    let json = [];
                    json.push(this.productSelected);
                    localStorage.setItem('cart', JSON.stringify(json));
                }
                this.$store.commit("quantityMap");
                this.$store.commit("shake", {ir: 'cartBadge'});
                setTimeout(() => {
                    this.$store.commit("clearShake");
                }, 1000);
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