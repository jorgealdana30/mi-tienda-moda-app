<template>
    <div id="app">
        <h1>Carrito</h1>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import BottomMenu from "./BottomMenu";
    export default {
        name: "Cart",
        components:{
            Toolbar, BottomMenu
        },
        mounted() {
            if (!localStorage.getItem('customer')){
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

</style>