<template>
  <div class="home-container">
    <div class="header"><m-header></m-header></div>
    <div class="body">
      <div class="menu"><m-menu></m-menu></div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from './components/m-header'
import MMenu from './components/m-menu'
export default {
  name: 'index',
  components: { MHeader, MMenu }
}
</script>

<style scoped lang="scss">
.home-container{
  width: 100%;
  height: 100%;
}
.header{
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0
}
.body{
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .menu{
    width: 250px;
    height: 100%;
    overflow: hidden;
  }
  .main{
    flex: 1;
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #f2f2f2;
  }
}
</style>
