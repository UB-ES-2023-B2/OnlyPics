import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PaginaInicio from './components/Inicio.vue'

createApp(App).use(router).use(router).mount('#app')

App.component('pagina-inicio', PaginaInicio)

