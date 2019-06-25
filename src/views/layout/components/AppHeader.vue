<template>
  <el-row gutter="20">
    <el-col :span="10">江苏传智播客</el-col>
    <el-col :span="5" offset="5">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "AppHeader.vue",
  data() {
    return {
        //  接收数据
        userInfo:{}
    }
  },
  //  获取数据
  created () {
    this.userInfo=JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>
<style lang='less' scoped>
</style>
