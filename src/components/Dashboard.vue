<template>
    <v-app>
        <Toolbar/>
        <v-content>
            <router-view></router-view>
        </v-content>
        <BottomMenu/>
    </v-app>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";

    export default {
        name: "Dashboard",
        components: {
            Toolbar, BottomMenu
        }
    }
</script>

<style scoped>

</style>