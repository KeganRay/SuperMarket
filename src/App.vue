<template>
  <div id="app">
    <router-view></router-view>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/content/Maintabbar/Maintabbar";

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>
<style>
  @import "assets/css/base.css";
  @import "assets/css/normalize.css";
</style>
