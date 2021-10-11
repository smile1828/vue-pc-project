<template>
  <div class="menu-wrap">
    <m-menu-item v-for="(menu) in menuList" :key="menu.id"
                 :menu="menu"
                 :activeIndex="activeIndex"
                 :padding="0"
                 @active="itemActive"></m-menu-item>
  </div>
</template>

<script>
import menuList from './m-menu-data.js'
import MMenuItem from './m-menu-item'
export default {
  name: 'm-menu',
  components: {
    MMenuItem
  },
  data () {
    return {
      menuList: menuList,
      activeIndex: ''
    }
  },
  methods: {
    itemActive (val) {
      this.activeIndex = val
    },
    updateActiveIndex (menuList, currUrl, parentMenu) {
      if (menuList.length <= 0) {
        return
      }
      for (let i = 0; i < menuList.length; i++) {
        const currMenu = menuList[i]
        if (currMenu.url === currUrl) {
          this.activeIndex = currMenu.id
          continue
        }
        if (currMenu.children !== null && currMenu.children !== undefined) {
          this.updateActiveIndex(currMenu.children, currUrl, currMenu)
          for (let j = 0; j < currMenu.children.length; j++) {
            const currSubMenu = currMenu.children[j]
            if (currSubMenu.id === this.activeIndex) {
              this.$set(currMenu, 'extend', true)
            }
            if (currSubMenu.extend) {
              this.$set(currMenu, 'extend', true)
            }
          }
        }
      }
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        this.updateActiveIndex(this.menuList, to.path, null)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.menu-wrap{
  width: 270px;
  height: 100%;
  overflow: auto;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
