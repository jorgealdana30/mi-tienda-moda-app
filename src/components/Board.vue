<template>
    <div id="app">
        <v-toolbar color="#f06292" class="toolbar-style">
            <v-toolbar-title class="title-toolbar">
                {{this.customer.firstname}} {{this.customer.lastname}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-icon>
                    mdi-phone
                </v-icon>
                <v-icon>
                    mdi-login
                </v-icon>
            </div>

        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "Board",
        data(){
            return{
                customer: null
            }
        },
        mounted() {
            if(localStorage.getItem('customer')){
                this.customer = JSON.parse(localStorage.getItem('customer'))
            }else{
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>
@import "../assets/styles.css";
</style>