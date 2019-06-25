<template>
  <div class="login-wrap">
    <!-- 
      配置校验规则
      rules  规则对象配置到 el-form上
      prop   规则对象配置到 el-form-item 上
      JS触发校验
      给el-form添加 ref
      调用 this.$refs['ref的名称'].validate((valid)=>{}) 触发校验
      rules中配置的校验字段必须和表单数据对象保持一致
     -->
    <el-form class="login-form"
     ref="form" 
    :model="form" 
    :rules= 'rules'>
      <el-form-item prop='mobile'>
        <el-input v-model= "form.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-col :span="14">
          <el-input v-model= "form.code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-button @click= "handleSendCode" :disabled= "!!codeTimer">{{ codeTimer? `剩余${ codeTimeSeconds }秒`:'获取验证码'}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop='agree'>
         <el-checkbox class='agree-checkbox' v-model= 'form.agree'></el-checkbox>
         <span class='agree-text'>我已阅读并同意 <a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login" @click= "handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt'
const initCodeTimeSeconds=10
export default {
  name: 'AppLogin',
  data() {
    return {
      //  表单数据对象
      form: {
        mobile: '',
        code: '',
        agree: ''
      },
      //  验证规则对象
      rules: {
       mobile: [
            { required: true, message : '请输入手机号', trigger: 'blur' },
            { pattern: /\d{11}/, message : '请输入有效的手机号码', trigger: 'blur' }
       ],
       code :[
           { required: true, message : '请输入验证码', trigger: 'blur' },
           { pattern: /\d{6}/, message : '请输入有效的验证码', trigger: 'blur' }
       ],
       //   把agree放入表单中  用表单验证以及规则进行校验
       agree: [
          { required: true, message : '请同意协议'},
          { pattern: /true/, message : '请同意协议'},
       ]
      },
      codeTimer: null,  //  倒计时事件
      codeTimeSeconds: initCodeTimeSeconds      //  倒计时定时器
    }
  },
  methods: {
    handleLogin() {
      //  触发form组件的validate方法进行校验，获取校验的结果状态
       this.$refs['form'].validate((valid)=>{
         //  表单验证不通过不会发送请求
         if(!valid){
           return 
         }
         //  表单验证通过提交登录请求
         this.submitLogin()
       })
      // console.log('handleLogin')
    },
    submitLogin() {
       axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res=>{
        //  登陆成功 获取用户信息
        const userInfo = res.data.data
        //  设置在本地存储
        window.localStorage.setItem('user_info',JSON.stringify(userInfo))
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({name: 'home'})
      })
      .catch((e)=>{
        console.log(e)
        this.$message.error('登陆失败 手机号或验证码错误')
      })
    },
    handleSendCode() {
      //  验证手机号是否有效
      this.$refs['form'].validateField('mobile',errorMessage=>{
        // console.log('errormessage=>',errorMessage)
        if(errorMessage.trim().length>0){
          return
        }
        //  初始化验证码
        this.showGeeTest()
      })
    
    },
    //  验证通过 初始化显示人机交互验证码 
    //  函数(普通函数 箭头函数无所谓)中的function内部的this指向window
    showGeeTest () {
        const { mobile } = this.form
      axios({
        methods: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const data = res.data.data
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          },
          captchaObj=>{
            captchaObj .onReady(()=> {
            // 验证码ready之后才能调用verify方法显示验证码
             captchaObj.verify()
            })
            .onSuccess(()=> {
            // your code
            // console.log(captchaObj.getValidate())
            const { geetest_challenge: challenge,
                    geetest_seccode: seccode,
                    geetest_validate: validate }
                  = captchaObj.getValidate()
                axios({
                  methods: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                }) .then ( res=> {
                  // console.log(res.data)
                  //  发送短信成功开始倒计时
                  this.codeCountDown()
                })
              })
              .onError(function () {
              })
          }
        )
      })
    },
    //  验证码倒计时
    codeCountDown () {
     this.codeTimer=window.setInterval(()=>{
       //  倒计时
       this.codeTimeSeconds--
      //   如果倒计时小于或者等于0
       if(this.codeTimeSeconds<=0){
         //  清除定时器
         window.clearInterval(this.codeTimer)
         //  让倒计时回归原始状态
         this.codeTimeSeconds=initCodeTimeSeconds
         this.codeTimer = null  //  将存储定时器引用的变量值重新赋值为null
       }
     },1000)
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
