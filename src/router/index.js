import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Categories from "../components/Categories";
import Catalogue from "../components/Catalogue";
import Cart from "../components/Cart";
import Dashboard from "../components/Dashboard";

Vue.use(VueRouter);

const routes = [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: "Dashboard",
            component: Dashboard,
            children: [
                {
                    path: "/categorias",
                    name: 'Categories',
                    component: Categories,
                    meta: {breadCrumb: 'Categories'},
                },
                {
                    path: '/catalogo',
                    name: "Catalogue",
                    component: Catalogue,
                    meta: {breadCrumb: 'Catalogue'},


                }, {
                    path: '/carrito',
                    name: "Cart",
                    component: Cart,
                    meta: {breadCrumb: 'Cart'},

                }]
        }
    ]
;

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
