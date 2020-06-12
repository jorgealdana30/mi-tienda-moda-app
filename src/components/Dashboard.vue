<template>
    <v-app>
        <Toolbar/>
        <v-content>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
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
        },
        mounted() {
            this.$store.commit("quantityMap")
        }
    }
</script>

<style scoped>

</style>