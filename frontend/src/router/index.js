import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
