<template>
    <div id="app">
        <v-banner color="primary" class="banner pr-2">
            <v-img src="https://mitienda.moda/img/productos-de-entrega-inmediata.e07d1e57.png"
                   class="ma-0 imageBanner align-end">
            </v-img>
            <v-btn color="black" class="white--text mb-2 buttonBanner" rounded>Ver Más</v-btn>
        </v-banner>
        <v-card color="primary" class="d-flex flex-wrap cardPrincipal">
            <v-card v-for="item in categories" class="subCard" elevation="2">
                <v-card-title>
                    <v-img :src="'https://api.tissini.app'+ item.image"></v-img>
                </v-card-title>
                <v-card-text>
                    <v-carousel hide-delimiter-background
                                show-arrows-on-hover>

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
                categories: null
            }
        },
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }

            this.loadInfo();
        },
        methods: {
            loadInfo() {
                axios.get('https://api.tissini.app/api/v2/categories', this.customer.id).then(response => {
                    this.categories = (response.data);
                    console.log(this.categories)
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