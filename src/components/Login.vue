<template>
    <v-app class="background">
        <v-content class="d-flex align-center mt-3">
            <v-card color="transparent" class="mt-12 containerLogin d-flex flex-column align-center">
                <v-card-title>
                    <v-img src="../assets/logo.c752bf8f.png" class="mt-12 logo animated fadeIn"></v-img>
                </v-card-title>
                <v-card-text class="white--text d-flex justify-center align-center flex-wrap">
                    <h3 class="descriptionLogin font-weight-bold mt-3 text-center monserrat">Ingresa el número de teléfono <br>de
                        tu asesora independiente.</h3>
                    <v-text-field
                            dark
                            v-model="telefono"
                            label="Telefono"
                            outlined
                            clearable
                            color="white"
                            class="telefonoInput mt-6"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-progress-circular class="loading" indeterminate color="white"></v-progress-circular>
                </v-card-actions>
            </v-card>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>