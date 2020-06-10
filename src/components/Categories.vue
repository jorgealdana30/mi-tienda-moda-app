<template>
    <div id="app">
        <v-banner color="primary" class="banner pr-2">
            <v-img src="https://mitienda.moda/img/productos-de-entrega-inmediata.e07d1e57.png"
                   class="ma-0 imageBanner align-end">
            </v-img>
            <v-btn color="black" class="white--text mb-2 buttonVerMas" rounded>Ver Más</v-btn>
        </v-banner>
        <v-card color="primary" class="d-flex flex-wrap cardPrincipal">
            <v-card class="subCard" style="height: auto; width: 100vw" elevation="2">
                <v-card-title>
                    <span class="montserrat">LINEAS</span>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex overflow-x-auto">
                        <v-img v-for="item in categories" :src="'https://api.tissini.app'+ item.image"
                               max-width="80vw"></v-img>
                    </div>
                </v-card-text>
            </v-card>
            <v-card class="subCard" elevation="2" v-for="items in sections">
                <v-card-title>
                    <v-img :src="'https://api.tissini.app'+ items.image"></v-img>
                </v-card-title>
                <v-card-text>
                    <v-carousel
                            continuous
                            cycle
                            hide-delimiter-background
                            hide-delimiters
                            show-arrows-on-hover
                    >
                        <v-carousel-item v-for="section in items.products">
                            <v-img :src="'https://api.tissini.app/'+section.image.url" width="25rem"
                                   style="margin: 0 auto" height="26rem"></v-img>
                            <v-divider></v-divider>
                            <v-list color="primary">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title style="margin-top: -10px!important;"
                                                           class="mt-1 mb-1 font-weight-bold">{{section.name}}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>{{section.categories.category[0].toUpperCase() +
                                            section.categories.category.slice(1)}}
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle class="mt-1">${{section.price}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-carousel-item>
                    </v-carousel>
                </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    import axios from 'axios'

    export default {
        name: "Categories",
        components: {
            Toolbar, BottomMenu
        },
        data() {
            return {
                customer: [],
                categories: null,
                sections: [],
                products: []
            }
        },
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }
            this.loadInfoCategories();
            this.loadSections();
        },
        methods: {
            loadInfoCategories() {
                axios.get('https://api.tissini.app/api/v2/categories').then(response => {
                    this.categories = (response.data);
                }).catch(error => {
                    console.log(error)
                })
            },
            loadSections() {
                axios.get('https://api.tissini.app/api/v1/categories/sections').then(response => {
                    this.sections = (response.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>