// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/../bootstrap/css/bootstrap.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import {userState} from "@/userState"
import axios from 'axios'
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);

Vue.config.productionTip = false

userState.user.available_money = 0

axios.defaults.withCredentials = true


axios.defaults.baseURL = 'https://onlypics.onrender.com'
//axios.defaults.baseURL = 'http://localhost:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
