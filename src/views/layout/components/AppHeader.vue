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
          <!--       我们可以使用.native修饰符将原始的html注册到组件的根元素            -->
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
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
      userInfo: {}
    };
  },
  //  获取数据
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem("user_info"));
  },
  methods: {
    handleLogout() {
      this.$confirm("确认退出吗", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  清楚本地的user_Info
          window.localStorage.removeItem("user_info"),
            //  跳转到登陆页面
            this.$router.push({ name: "login" }),
            this.$message({
              type: "success",
              message: "退出成功!"
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
