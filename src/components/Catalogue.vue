<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0" flat height="auto" color="primary">
            <Autocomplete/>
            <v-card class="subCard d-flex justify-center" v-if="!hasCategory" style="height: auto; width: 100vw"
                    elevation="2">
                <v-card-title>
                    <span class="montserrat">{{category.categories.name}}</span>
                </v-card-title>
            </v-card>
            <v-card class="subCard" v-if="hasCategory" style="height: auto; width: 100vw" elevation="2">
                <v-card-title>
                    <span class="montserrat">CATEGORÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-carousel cycle continuous height="auto" hide-delimiters hide-delimiter-background
                                show-arrows-on-hover>
                        <v-carousel-item v-for="item in category.categories">
                            <v-img :src="'https://api.tissini.app'+ item.image"
                                   max-width="90vw"></v-img>
                        </v-carousel-item>
                    </v-carousel>
                </v-card-text>
            </v-card>
            <v-card class="subCard" ref="table" v-for="item in products" style="height: auto" elevation="2">
                <v-lazy :options="{threshold: .5}"
                        min-height="200" :transition="transition" v-model="isActive">
                    <v-skeleton-loader :transition="transition" :loading="loading" type="card">
                        <div>
                            <v-card-title>
                                <v-carousel height="auto" :show-arrows="Object.keys(item.images).length>1">
                                    <v-carousel-item v-for="photos in item.images">
                                        <v-img :src="'https://api.tissini.app/'+ photos.url"></v-img>
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
                                            <v-btn rounded @click="saveToCart(item)">
                                                <v-icon>mdi-cart-plus</v-icon>
                                                Agregar
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </div>
                    </v-skeleton-loader>
                </v-lazy>
            </v-card>
            <v-dialog v-model="selectVariant" persistent>
                <v-card>
                    <v-card-title class="mb-1 pb-4" style="background-color: #f06292">
                        <v-btn icon text @click="selectVariant = !selectVariant">
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
                            <span class="montserrat font-weight-bold" style="color: #f06292;">Selecciona el Tamaño</span>
                            <div class="d-flex justify-center flex-row">
                                <v-select :items="variants">
                                </v-select>
                            </div>
                        </div>
                        <div>
                            <span class="montserrat font-weight-bold" style="color: #f06292;">Selecciona la cantidad</span>
                            <v-select :items="selectItems">
                            </v-select>
                        </div>
                    </v-card-text>
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

    export default {
        name: "Catalogue",
        components: {
            Toolbar, BottomMenu, Autocomplete
        },
        data() {
            return {
                category: [],
                products: [],
                isActive: true,
                categoryName: '',
                loading: true,
                transition: 'fade-transition',
                size: '',
                hasCategory: true,
                selectVariant: false,
                variants: [],
                cantidad: 0,
                productSelected: null
            }
        },
        activated() {
            this.category = JSON.parse(localStorage.getItem('categorySelected'));
            this.loadProducts();
        },
        deactivated() {
            this.products = []
        },
        computed:{
            selectItems(){
                let json = [];
                for (let i in this.cantidad){
                    json.push(i)
                }
                console.log(json)
                return json
            }
        },

        methods: {
            loadProducts() {
                let id = '';
                if (this.category.hasOwnProperty('category_id')) {
                    id = this.category['category_id'];
                    this.hasCategory = false
                } else {
                    id = this.category.id;
                    this.hasCategory = true
                }
                axios.get('https://api.tissini.app/api/v2/categories/' + id + '/products').then(response => {
                        this.products = response.data.products;
                        this.loading = false
                    }
                );
            },
            saveToCart(product) {
                this.selectVariant = true;
                for(let i in product.variants){
                    this.variants.push(product.variants[i].size);
                }
                /*if (localStorage.getItem('cart')) {
                    let json = [];
                    json = JSON.parse(localStorage.getItem('cart'));
                    json.push(product);
                    localStorage.setItem('cart', JSON.stringify(json));
                } else {
                    let json = [];
                    json.push(product);
                    localStorage.setItem('cart', JSON.stringify(json));
                }*/
            },
        }
    }
</script>

<style scoped>

</style>