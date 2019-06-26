<template>
  <!-- 
    default active 设置默认激活的项
    open close 当菜单展开和收起的时候会被触发
    backgroundcolor 菜单栏的背景颜色
    text-color 文本文字的背景颜色
    active-text-color 被激活时文本的背景颜色
    el-submenu    index 用来区分不同的导航项目 可以用作路由导航路径 必须唯一 否则会出现冲突
  -->
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont icon-document"></i>
        <span>内容</span>
      </template>
      <el-menu-item index="/publish">
        <i class="iconfont icon-edit"></i>
        <span slot="title">发布</span>
      </el-menu-item>
      <el-menu-item index="1-3">
        <i class="iconfont icon-icon-articles"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/comment">
      <i class="iconfont icon-comment"></i>
      <span slot="title">评论</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fensi"></i>
      <span slot="title">粉丝</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="iconfont icon-account"></i>
      <span slot="title">账户</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "AppAside.vue",
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
};
</script>
<style lang='less' scoped>
</style>
