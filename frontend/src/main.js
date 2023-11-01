// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
