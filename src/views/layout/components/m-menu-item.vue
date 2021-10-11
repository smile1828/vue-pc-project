<template>
  <div class="m-menu-item-wrap" :class="{'m-menu-item-wrap-active': activeIndex === menu.id}">
    <div class="m-menu-item" @click="menuClick" :style="{paddingLeft: getPadding + 'px'}">
<!--      <div class="m-menu-item__icon"></div>-->
      <div class="m-menu-item__label" :title="menu.label" :class="{'m-menu-item__label-active': activeIndex === menu.id}">{{menu.label}}</div>
      <div class="m-menu-item__arrow" :class="{'m-menu-item__arrow-active': menu.extend}" v-if="menu.children && menu.children.length > 0">
        <m-icon-font name="icon-arrow-right" size="12px"></m-icon-font>
      </div>
    </div>
    <div class="m-menu-list" :class="{'m-menu-list-active': menu.extend}">
      <m-menu-item v-for="(item) in menu.children" :key="item.id"
                   :menu="item"
                   :activeIndex="activeIndex"
                   :padding="getPadding"
                   @active="menuActive"></m-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-menu-item',
  props: ['menu', 'activeIndex', 'padding'],
  data () {
    return {
      showList: false
    }
  },
  computed: {
    getPadding () {
      return this.padding + 20
    }
  },
  methods: {
    menuClick () {
      if (this.menu.children && this.menu.children.length > 0) {
        this.$set(this.menu, 'extend', !this.menu.extend)
        if (this.menu.extend === false) {
          this.updateSubMenuExtend(this.menu.children)
        }
      } else {
        this.$emit('active', this.menu.id)
        this.$router.push({
          path: this.menu.url
        })
      }
    },
    updateSubMenuExtend (list) {
      if (list.length <= 0) {
        return
      }
      for (let i = 0; i < list.length; i++) {
        const currMenu = list[i]
        this.$set(currMenu, 'extend', false)
        if (currMenu.children !== null && currMenu.children !== undefined) {
          this.updateSubMenuExtend(currMenu.children)
        }
      }
    },
    menuActive (val) {
      this.$emit('active', val)
    }
  }
}
</script>

<style scoped lang="scss">
.m-menu-item-wrap{
  width: 100%;
  box-sizing: border-box;
  background: $background-color;
}
.m-menu-item-wrap-active{
  background: $color-primary;
}
.m-menu-item{
  width: 100%;
  height: 56px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  .m-menu-item__icon{
    width: 20px;
    height: 20px;
  }
  .m-menu-item__arrow{
    margin-left: auto;
    width: 12px;
    height: 12px;
    transition: 300ms;
  }
  .m-menu-item__arrow-active{
    transform: rotateZ(90deg);
  }
  .m-menu-item__label{
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    color: #2E4356;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .m-menu-item__label-active{
    color: $color-inverse;
  }
}
.m-menu-list{
  width: 100%;
  height: 0;
  max-height: 0;
  overflow: hidden;
  transition: 300ms;
  box-sizing: border-box;
}
.m-menu-list-active{
  height: auto;
  max-height: 500px;
}
</style>
