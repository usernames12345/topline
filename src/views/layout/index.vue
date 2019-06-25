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
        <router-view/>
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
