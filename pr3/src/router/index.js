import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import Investments from "@/views/Investments";
import PastInvestments from "@/views/PastInvestments";
import TradePost from "@/views/TradePost";
import Item from "@/views/Item"
import Statistics from "@/views/Statistics";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/investments',
        name: 'Investments',
        component: Investments
    },
    {
        path: '/past',
        name: 'Past Investments',
        component: PastInvestments
    },
    {
        path: '/tp',
        name: 'Trade Post',
        component: TradePost
    },
    {
        path: '/tp/:id',
        name: 'Item',
        component: Item,
        props: true
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    },
]

const router = new VueRouter({
    base: '/~kaviik/kasutajaliidesed/prax3/',
    // publicPath: '/~kaviik/kasutajaliidesed/prax3',
    routes: routes
})

export default router
