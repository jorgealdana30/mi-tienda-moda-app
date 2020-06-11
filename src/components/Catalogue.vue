<template>
    <div id="app">
        <v-card class="cardPrincipal banner">
            <div class="d-flex flex-row align-center">
                <v-btn icon color="primary">
                    <v-icon>
                        mdi-arrow-left
                    </v-icon>
                </v-btn>
                <v-autocomplete
                        v-model="model"
                        :items="items"
                        :loading="loading"
                        :search-input.sync="search"
                        chips
                        clearable
                        hide-details
                        hide-selected
                        item-text="name"
                        item-value="symbol"
                        label="Search for a coin..."
                        solo
                >
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                                Search for your favorite
                                <strong>Cryptocurrency</strong>
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
                                color="indigo"
                                class="headline font-weight-light white--text"
                        >
                            {{ item.name.charAt(0) }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>mdi-coin</v-icon>
                        </v-list-item-action>
                    </template>
                </v-autocomplete>
            </div>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";

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
                model: null
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
            model(val) {
                if (val != null) this.tab = 0;
                else this.tab = null
            },
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