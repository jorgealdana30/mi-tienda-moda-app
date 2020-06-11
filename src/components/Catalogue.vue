<template>
    <div id="app">
        <v-card class="cardPrincipal banner" height="100vh" color="primary">
            <Autocomplete/>
        </v-card>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    import Autocomplete from "./Autocomplete";
    export default {
        name: "Catalogue",
        components: {
            Toolbar, BottomMenu, Autocomplete
        },
        data() {
            return {

            }
        }

    }
</script>

<style scoped>

</style>