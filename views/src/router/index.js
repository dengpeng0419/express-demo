import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserMenu from '@/pages/UserMenu'
import Login from '@/pages/Login'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '',
    routes: [{
        path: '/menu',
        name: 'userMenu',
        component: UserMenu
    },{
        path: '/login',
        name: 'login',
        component: Login
    },{
        path: '/home',
        name: 'home',
        component: Home
    }]
})
