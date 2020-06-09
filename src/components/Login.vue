<template>
    <v-app class="background">
        <v-content class="d-flex align-center mt-3">
            <v-card color="transparent" class="mt-12 containerLogin d-flex flex-column align-center">
                <v-card-title>
                    <v-img src="../assets/logo.c752bf8f.png" class="mt-12 logo animated fadeIn"></v-img>
                </v-card-title>
                <v-card-text class="white--text">
                    <v-row>
                        <v-col cols="1" sm="12">
                            <h3 class="pl-12 pr-12 font-weight-bold text-center monserrat">Ingresa el número de teléfono de tu asesora independiente.</h3>
                        </v-col>
                    </v-row>
                    <v-row class="pl-6 pr-6">
                        <v-col cols="12" sm="12">
                            <v-text-field
                                    dark
                                    v-model="telefono"
                                    label="Telefono"
                                    outlined
                                    clearable
                                    color="white"
                                    class="telefonoInput"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>

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