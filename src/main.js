import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
import { getUser,removeUser } from '@/utils/auth'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
//  config 是本次请求相关的配置对象
// axios 请求拦截器 发出的请求会先经过这里
axios.interceptors.request.use( (config)=> {
  const user = getUser()
  //  如果有用户 则往本次请求中添加就给用户一个token
  if(user) {
  config.headers.Authorization = `Bearer ${ user.token }`
  }
  // return config 是允许请求发送的开关
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error);
})




// axios 回应拦截器 接受的响应先来这
//  reponse 就是响应结果对象  这里将response原样返回  发送请求的地方收到的就是response
//  我们可以控制请求收到的相应数据的格式
axios.interceptors.response.use( (response)=> {
  if( typeof response.data === 'object' && response.data.data){
    return response.data.data
  }else {
    return response.data
  }
  // Do something with response data
}, error=> {
//  如果用户的
// 无效 让其跳转到登陆界面
if(error.response.status === 401){
  router.push({ name: 'login' })
  removeUser()
}
  return Promise.reject(error)
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
