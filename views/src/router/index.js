import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserMenu from '@/pages/UserMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserMenu',
      component: UserMenu
    }
  ]
})
