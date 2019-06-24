<template>
  <div class="login-wrap">
    <el-form class="login-form" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="14">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-button @click="handleSendCode">发送短信验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "AppLogin",
  data () {
    return {
      form: {
        //要求返回的参数
        mobile: "",
        code: ""
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!")
    },
    handleSendCode() {
      const { mobile } = this.form
      axios({
        methods: "GET",
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login-wrap {
  height: 100%;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .form-head {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: center;
  }
  .login {
    width: 100%;
  }
}
</style>
