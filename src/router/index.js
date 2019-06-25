import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes:[
        //  layout显示到App根组件的路由出口
        //  嵌套路由
        //  所有的 children路由都显示到父组件的router-view中
        //name:'layout'  使用JS 命名路由默认不会渲染子路由
        {
           
            path:'/',
            component: ()=>import('@/views/layout'),
            children: [  
                {
                    name:'home',
                    path:'/home',
                    component:()=>import('@/views/home')
                },
                {
                    name:'publish',
                    path:'/publish',
                    component:()=>import('@/views/publish')
                }
            ]   
               
        },
        {
            name:'login',
            path:'/login',
            component:()=>import('@/views/login')
        }
    ]
})