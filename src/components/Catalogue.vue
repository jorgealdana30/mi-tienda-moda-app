<template>
    <div id="app">
        <v-card class="cardPrincipal banner mb-0" flat height="auto" color="primary">
            <Autocomplete/>
            <v-card class="subCard" style="height: auto; width: 100vw" elevation="2">
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
            <v-card class="subCard" v-for="item in products" style="height: auto" elevation="2">
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
                                            <v-list-item-subtitle class="mt-1 white--text">${{item.price}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn rounded><v-icon>mdi-cart-plus</v-icon>Agregar</v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </div>
                    </v-skeleton-loader>
                </v-lazy>
            </v-card>
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
                loading: true,
                transition: 'fade-transition',
                size: 0
            }
        },
        activated() {
            this.category = JSON.parse(localStorage.getItem('categorySelected'));
            this.loadProducts();
        },
        deactivated() {
          this.products = []
        },
        methods: {
            loadProducts() {
                axios.get('https://api.tissini.app/api/v2/categories/' + this.category.id + '/products').then(response => {
                        this.products = response.data.products;
                        setTimeout(() => {
                            this.loading = false
                        }, 1000)
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>