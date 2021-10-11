<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="welcome-wrap">
        <div class="welcome__text">欢 迎 使 用</div>
        <div class="welcome__text" style="margin-top: 30px">XXX管理系统</div>
      </div>
      <div class="login-body">
        <el-form :model="userInfo" :rules="userRules" ref="loginForm" label-position="left" label-width="0px">
          <el-form-item prop="username">
            <div class="login-form-item">
              <div class="label">手机号</div>
              <el-input class="value" type="text" placeholder="请输入手机号" v-model="userInfo.username" auto-complete="off" @keyup.native.enter="login"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="login-form-item">
              <div class="label">密码</div>
              <el-input class="value" :type="isPassVisible ? 'text' : 'password'" placeholder="请输入登录密码" v-model="userInfo.password" auto-complete="off" @keyup.native.enter="login">
                <m-icon-font slot="suffix"
                             :name="isPassVisible ? 'icon-eye' : 'icon-eye-close'"
                             size="20px"
                             @click="changePasswordType"></m-icon-font>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox style="margin-left: 10px" v-model="checked">记住我</el-checkbox>
          </el-form-item>
          <div class="btn-wrap">
            <el-button style="width: 100%" type="primary" @click="login" :loading="loading">登&nbsp;&nbsp;录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { signIn, getUserInfo } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      userRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isPassVisible: false,
      checked: false,
      loading: false
    }
  },
  created () {
    let userPass = localStorage.getItem('userPass')
    if (userPass) {
      userPass = JSON.parse(userPass)
      this.$set(this.userInfo, 'username', userPass.username)
      this.$set(this.userInfo, 'password', userPass.password)
      this.checked = userPass.checked
    } else {
      this.checked = false
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 记住密码，将账号信息存到本地
          if (this.checked) {
            const userPass = {
              username: this.userInfo.username,
              password: this.userInfo.password,
              checked: this.checked
            }
            localStorage.setItem('userPass', JSON.stringify(userPass))
          } else {
            localStorage.removeItem('userPass')
          }
          const params = {
            username: this.userInfo.username,
            password: this.userInfo.password
          }
          this.loading = true
          signIn(params).then(res => {
            // 保存token
            sessionStorage.setItem('token', res.token)
            // 获取用户信息
            this.queryUserInfo()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    queryUserInfo () {
      getUserInfo().then(res => {
        this.loading = false
        // 将用户信息保存到store和localstorage中
        const userInfo = res
        this.$store.commit('updateUserInfo', userInfo)
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        // 跳转首页
        this.$router.push({
          path: '/index'
        })
      }).catch(() => {
        this.loading = false
      })
    },
    changePasswordType () {
      this.isPassVisible = !this.isPassVisible
    }
  }
}
</script>

<style scoped lang="scss">
.login-container{
  width: 100%;
  height: 100%;
  background-color: $color-primary;
  background-image: url("../../assets/image/banner-login.jpg");
  background-position: center;
  background-size: cover;
  overflow: auto;
}
.login-wrap{
  max-width: 1200px;
  min-width: 350px;
  width: 100%;
  height: 100%;
  min-height: 340px;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.login-body{
  width: 350px;
  padding: 35px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  .btn-wrap{
    width:100%;
}
}
.welcome-wrap{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  .welcome__text{
    font-weight: bold;
    font-size: 40px;
    color: #2E4356;
    letter-spacing: 2px;
}
}
.login-form-item{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: $border-primary;
  .label{
    width: 60px;
    text-align: center;
    border-right: $border-base;
    @include secondary-text;
  }
  .value{
    flex: 1;
  }
  ::v-deep .el-input__inner{
    border: none
  }
}
@media (max-width: 820px) {
  .login-wrap{
    justify-content: center;
  }
  .welcome-wrap{
    display: none;
  }
}
</style>
