/* eslint-disable */
import '@/../bootstrap/css/bootstrap.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import userState from './userState'

Vue.config.productionTip = false

userState.user.available_money = 0
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
