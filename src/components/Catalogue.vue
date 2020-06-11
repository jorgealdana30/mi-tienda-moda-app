<template>
    <div id="app">
        <v-card class="cardPrincipal banner" height="100vh" color="primary">
            <div class="d-flex flex-row align-center white">
                <v-btn icon color="primary" class="ml-2" :to="{name: 'Categories'}">
                    <v-icon>
                        mdi-arrow-left
                    </v-icon>
                </v-btn>
                <v-autocomplete
                        :items="items"
                        :loading="loading"
                        :search-input.sync="search"
                        chips
                        clearable
                        hide-details
                        hide-selected
                        item-text="name"
                        item-value="symbol"
                        label="Buscar un producto..."
                        flat
                        prepend-inner-icon="mdi-magnify"
                        solo
                >
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                Escribe un producto para comenzar a buscar
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                    <template v-slot:selection="{ attr, on, item, selected }">
                        <v-chip
                                v-bind="attr"
                                :input-value="selected"
                                color="blue-grey"
                                class="white--text"
                                v-on="on"
                        >
                            <v-icon left>mdi-coin</v-icon>
                            <span v-text="item.name"></span>
                        </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                        <v-list-item-avatar
                                tile
                                class="headline font-weight-light white--text"
                        >
                            <v-img :src="'http://api.tissini.app/'+ item.image.url"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="ma-2">
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.reference"></v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </v-autocomplete>
            </div>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    import axios from "axios"

    export default {
        name: "Catalogue",
        components: {
            Toolbar, BottomMenu
        },
        data() {
            return {
                loading: false,
                items: [],
                search: null,
                select: null,
                products: [],
                tab: null,
            }
        },
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }
            if (localStorage.getItem('categories')) {
                this.products = JSON.parse(localStorage.getItem('categories'))
            }
        },
        methods: {},
        model(val) {
            if (val != null) this.tab = 0;
            else this.tab = null
        },
        watch: {
            search(val) {
                if (this.items.length > 0) return;
                this.loading = true;
                setTimeout(() => {
                    let json = JSON.parse(localStorage.getItem('categories'));
                    for(let i in json){
                        for (let j in json[i].products){
                            this.items.push(json[i].products[j])
                        }
                    }
                    this.loading = false

                }, 500)
            }
        }
    }
</script>

<style scoped>

</style>