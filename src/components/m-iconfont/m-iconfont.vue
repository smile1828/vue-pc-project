<template>
    <span class="iconfont" :class="name" :style="[{color: color, fontSize: size}]" @click="$emit('click', $event)"></span>
</template>

<script>
export default {
  name: 'm-iconfont',
  props: {
    name: String,
    color: String,
    size: String
  }
}
</script>

<style scoped>
@import url("./iconfont.css");
.iconfont {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
}
</style>
