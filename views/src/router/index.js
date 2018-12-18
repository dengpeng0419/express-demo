import Vue from 'vue'
import Router from 'vue-router'
import UserMenu from '@/pages/UserMenu'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import AddArticle from '@/pages/AddArticle'
import EditArticle from '@/pages/EditArticle'
import PageList from '@/pages/PageList'
import TotalData from '@/pages/TotalData'

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
        component: Home,
        children: [{
            path: 'addArticle',
            component: AddArticle
        }, {
            path: 'editArticle',
            component: EditArticle
        }, {
            path: 'pageList',
            component: PageList
        }, {
            path: '/',
            component: TotalData
        }]
    }]
})
