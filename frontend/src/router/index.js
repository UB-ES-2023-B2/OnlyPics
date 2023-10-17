import { createRouter, createWebHashHistory } from 'vue-router'

import PaginaInicio from '@/components/Inicio.vue'

const routes = [
  {
    path: '/',
    name: 'PaginaInicio',
      component: PaginaInicio
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
