<template>
    <div id="app">
        <v-toolbar color="primary" class="toolbar-style">
            <v-toolbar-title class="title-toolbar">
                {{customer.firstname}} {{customer.lastname}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-icon class="pr-5" color="white">
                    mdi-phone
                </v-icon>
                <v-icon class="pr-2" color="white">
                    mdi-login
                </v-icon>
            </div>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "Toolbar",
        data(){
            return {
                customer: [],
            }
        },
        mounted() {
            if(localStorage.getItem('customer')){
                this.customer = JSON.parse(localStorage.getItem('customer'));
            }else{
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

</style>