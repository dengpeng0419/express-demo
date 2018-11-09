import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserMenu from '@/pages/UserMenu'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '',
    routes: [{
        path: '/menu',
        name: 'UserMenu',
        component: UserMenu
    },{
        path: '/login',
        name: 'Login',
        component: Login
    }]
})
