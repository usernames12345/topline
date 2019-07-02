<template>
  <el-container>
    <el-aside width="200px">
        <AppAside/>
    </el-aside>
    <el-container>
      <el-header>
          <AppHeader/>
      </el-header>
      <el-main>
        <!-- home 文章的评论 内容 文章列表 等等。。 都显示在这-->
        <!-- 
          禁用路有缓存只需要给router-view 添加一个唯一的key即可
          这样路由就不会去缓存组件了
          这个key要保持唯一
          禁用路由不是必须的看情况
          如果刻意使用默认的路由缓存能力那么就不要禁用缓存的路由中通过
          方式一 监视$route 做处理
          方式二 新增的beforeRouteUpdate 路由导航钩子做处理
         -->
        <router-view  :key = '$route.path'/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from "./components/AppAside"
import AppHeader from "./components/AppHeader"
export default {
  name: "AppLayout",
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
   .el-container {
       height:100%;
   }
   .el-aside {
       background-color: #343a46;
   }
   .el-header {
    background-color: #aec0d1;
   }
   .el-main {
       background-color: #e8eff4;
   }
</style>
