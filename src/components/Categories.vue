<template>
    <div id="app">
        <v-card class="d-flex mt-2" style="height: 100vh">
            <v-card-title>
                <h1>sd</h1>
            </v-card-title>
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
                categories: []
            }
        },
        mounted() {
            if (!localStorage.getItem('customer')) {
                this.$router.push({name: 'Login'})
            }
            axios.get()
        }
    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>