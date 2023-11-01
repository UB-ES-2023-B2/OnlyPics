import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/inicio',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }

  ]
})
