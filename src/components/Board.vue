<template>
    <div id="app">
        <Toolbar/>
        <router-view name="board"></router-view>
        <v-bottom-navigation
                :value="activeBtn"
                grow
                color="primary"
        >
            <v-btn>
                <span>Categorias</span>
                <v-icon>mdi-home-outline</v-icon>
            </v-btn>

            <v-btn>
                <span>Catalogo</span>
                <v-icon>mdi-badge-account-outline</v-icon>
            </v-btn>

            <v-btn>
                <span>Nearby</span>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";

    export default {
        name: "Board",
        components: {
            Toolbar
        },
        data() {
            return {
                customer: null,
                activeBtn: 1
            }
        }
    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>