import Vue from "vue";
import Router from "vue-router";
import nprogress from "nprogress";
import { getUser } from '@/utils/auth'
Vue.use(Router);
const router = new Router({
  routes: [
    //  layout显示到App根组件的路由出口
    //  嵌套路由
    //  所有的 children路由都显示到父组件的router-view中
    //name:'layout'  使用JS 命名路由默认不会渲染子路由
    {
      path: "/",
      component: () => import("@/views/layout"),
      children: [
        {
          name: "home",
          path: "/home",
          component: () => import("@/views/home")
        },
        {
          name: "publish",
          path: "/publish",
          component: () => import("@/views/publish")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login")
    }
  ]
});
// 全局导航守卫
//当访问路由页面的时候会先进入这里
//to 要去哪相关的参数
//from  来在哪相关的数据
//next 允许通过对的方法
router.beforeEach((to, from, next) => {
  //  路由导航前开启进度条
  nprogress.start();
  // 获取用户信息
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
//   next();
  if (to.path !== "/login") {
    //  如果是非登录页面
    //如果没有登陆跳转到登陆页面
    if (!userInfo) {
      next({ name: "login" })
    } else {
      //如果登陆了允许通过
      next()
    }
  } else {
    if (!userInfo) {
      next()
    } else {
    //   next(false) //中断当前导航
    //   window.location.href = "/#/"
    //   window.location.reload()
    next({ name: 'home' })
    window.location.reload()
    }
  }
});
router.afterEach((to, from) => {
  //  路由导航完成  结束进度条
  nprogress.done()
})
export default router
