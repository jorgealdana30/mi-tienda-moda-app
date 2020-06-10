<template>
    <div id="app">
        <v-app-bar fixed  color="primary" class="toolbar-style">
            <v-toolbar-title class="title-toolbar">
                {{customer.firstname}} {{customer.lastname}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-btn icon class="buttonIcon" text href="tel:786-547-0213">
                    <v-icon color="white">mdi-phone</v-icon>
                </v-btn>
                <v-btn icon text @click="logout">
                    <v-icon color="white">
                        mdi-login
                    </v-icon>
                </v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Toolbar",
        data() {
            return {
                customer: [],
            }
        },
        mounted() {
            if (localStorage.getItem('customer')) {
                this.customer = JSON.parse(localStorage.getItem('customer'));
            } else {
                this.$router.push({name: 'Categories'})
            }
        }
    }
</script>

<style scoped>

</style>