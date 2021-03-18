<template>
  <div id="Navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
#Navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #FE6A86;
}

.left, .right {
  width: 60px;
  /*background-color: #42b983;*/
}

.center{
  /*如果其他都有设置宽度，那么剩下的宽度就全是它的*/
  flex: 1;
}
</style>

