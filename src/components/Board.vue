<template>
    <div id="app">
        <Toolbar/>
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
                customer: null
            }
        },

    }
</script>

<style scoped>
    @import "../assets/styles.css";
</style>