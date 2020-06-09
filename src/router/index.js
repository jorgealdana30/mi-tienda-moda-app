import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Board from "../components/Board";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        components: {main: Login}
    },
    {
        path: '/dashboard',
        name: 'Board',
        components: {main: Board}
    }

];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
