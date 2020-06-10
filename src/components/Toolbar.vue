<template>
    <div id="app">
        <v-app-bar fixed color="primary" class="toolbar-style">
            <v-toolbar-title class="title-toolbar">
                {{customer.firstname}} {{customer.lastname}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-btn icon class="buttonIcon" text href="tel:786-547-0213">
                    <v-icon color="white">mdi-phone</v-icon>
                </v-btn>
                <v-btn icon text @click="logoutAlert = !logoutAlert">
                    <v-icon color="white">
                        mdi-login
                    </v-icon>
                </v-btn>
            </div>
        </v-app-bar>
        <v-dialog v-model="logoutAlert" persistent>
            <v-card>
                <v-card-title class="mb-1 pb-4" style="background-color: #f06292">
                    <v-toolbar-title>
                        <span class="white--text">¿Quieres salir?</span>
                    </v-toolbar-title>
                </v-card-title>
                <v-card-text class="mt-1">
                    <span class="text-justify">
                        Dándole un toque a este botón sales de la Tienda. Si quieres navegar
                    en la Tienda utiliza las opciones de la parte inferior.
                    </span>
                    <v-spacer></v-spacer>
                    <div class="buttonsLogOut" style="margin-bottom: -20px;">
                        <v-btn text color="primary" @click="logoutAlert = false" :to="{name: 'Categories'}"
                               class="mt-1">
                            <v-icon color="primary">
                                mdi-home-outline
                            </v-icon>
                            <span class="black--text">Categorias</span>
                        </v-btn>
                        <v-btn text color="primary" @click="logoutAlert = false" :to="{name: 'Catalogue'}" class="mt-1">
                            <v-icon color="primary">
                                mdi-badge-account-outline
                            </v-icon>
                            <span class="black--text">Catalogo</span>
                        </v-btn>
                        <v-btn text color="primary" @click="logoutAlert = false" :to="{name: 'Cart'}" class="mt-1">
                            <v-icon color="primary">
                                mdi-cart-outline
                            </v-icon>
                            <span class="black--text">Carrito</span>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn color="primary" text @click="logout">
                        Salir de la tienda
                    </v-btn>
                    <v-btn color="primary" text @click="logoutAlert = !logoutAlert">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "Toolbar",
        data() {
            return {
                customer: [],
                logoutAlert: false
            }
        },
        mounted() {
            if (localStorage.getItem('customer')) {
                this.customer = JSON.parse(localStorage.getItem('customer'));
            } else {
                this.$router.push({name: 'Categories'})
            }
        },
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

</style>