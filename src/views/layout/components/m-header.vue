<template>
  <div class="header-wrap">
    <div class="logo-wrap">
      <div class="logo"></div>
      <div class="text">XXX管理系统</div>
    </div>
    <div class="info-wrap">
      <div class="user-name">{{ userInfo.realname }}</div>
      <div class="quit" @click="quit">退出</div>
    </div>
  </div>
</template>

<script>
import { signOut } from '@/api/login'
export default {
  name: 'm-header',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    const userInfo = sessionStorage.getItem('userInfo') || {}
    this.userInfo = JSON.parse(userInfo)
  },
  methods: {
    quit () {
      this.$confirm('确定退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        signOut().then(res => {
          // 清除token
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('secret')
          // 清除用户信息
          this.$store.commit('updateUserInfo', {})
          sessionStorage.removeItem('userInfo')
          this.$store.commit('updateHallId', '')
          sessionStorage.removeItem('hallId')
          this.$router.push({
            path: '/login'
          })
        }).catch(() => {
          this.$message.error('网络错误，稍后再试')
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrap{
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .user-name{
    font-size: 16px;
  }
  .quit{
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
  }
}
.logo-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .logo{
    width: 44px;
    height: 44px
  }
  .text{
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
