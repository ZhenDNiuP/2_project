import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/common/common.css'
import '../src/plugins/ant-design.js'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:8081'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
