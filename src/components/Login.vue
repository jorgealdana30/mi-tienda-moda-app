<template>
    <v-app class="background">
        <v-content class="d-flex align-center mt-3">
            <v-card color="transparent" class="mt-12 containerLogin d-flex flex-column align-center">
                <v-card-title>
                    <v-img src="../assets/logo.c752bf8f.png" class="mt-12 logo animated fadeIn"></v-img>
                </v-card-title>
                <v-card-text class="white--text d-flex justify-center align-center flex-wrap">
                    <h3 class="descriptionLogin font-weight-bold mt-3 text-center monserrat">Ingresa el número de
                        teléfono <br>de
                        tu asesora independiente.</h3>
                    <v-text-field
                            dark
                            type="text"
                            v-model="telefono"
                            label="Telefono"
                            outlined
                            clearable
                            v-on:keyup=login
                            color="white"
                            class="telefonoInput mt-6"
                            maxlength="12"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-progress-circular v-if="loadingLogin" class="loading" indeterminate
                                         color="white"></v-progress-circular>
                </v-card-actions>
            </v-card>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {
                telefono: null,
                loadingLogin: false
            }
        },
        mounted() {

        },
        methods: {
            login() {
                this.telefono = (this.formatNumber(this.telefono));
                if (this.telefono.length === 12) {
                    this.loadingLogin = true;
                    let data = {
                        mobilephone: this.telefono.replace(/\s+/g, '')
                    };
                    axios.post('https://api.tissini.app/api/v1/login/client', data).then(response => {
                        localStorage.setItem('customer', JSON.stringify(response.data.customer));
                        this.loadingLogin = false;
                    });

                }
            },
            formatNumber(value) {
                let number = value.replace(/\D/g, '');
                const match = number.match(/^(\d{1,3})(\d{0,3})(\d{0,4})(\d{0,4})$/);
                if (match) {
                    console.log(match);
                    number = `${match[1]}${match[2] ? ' ' : ''}${match[2]}${match[3] ? ' ' : ''}${match[3]}${match[4] ? ' x' : ''}${match[4]}`;
                }
                return number;
            }
        }
    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>