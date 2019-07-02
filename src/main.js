import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
import { getUser,removeUser } from '@/utils/auth'
import JSONbig from 'json-bigint'
import store from './store'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [function (data) {
  try {
        return JSONbig.parse(data)
  }catch (err) {
        return data
  }
}]
//请求拦截器
axios.interceptors.request.use(config=>{
  const user = getUser()
  if (user) {
     config.headers.Authorization = `Bearer ${ user.token }`

  }
  return config
},error =>{
  return Promise.reject (error)
})
axios.interceptors.response.use(response =>{
   if(typeof response.data === 'object' && response.data.data){
     return response.data.data
   }else {
     return response.data
   }
},error =>{
  console.dir(error)
  if (error.response.status === 401) {
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})
Vue.use (ElementUI)
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
