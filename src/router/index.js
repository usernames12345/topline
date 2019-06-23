import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default ({
    routes:[
        {
            name:'home',
            path:'/',
            component:()=>import('@/views/home') 
        },
        {
            name:'login',
            path:'/login',
            component:()=>import('@/views/login')
        }
    ]
})