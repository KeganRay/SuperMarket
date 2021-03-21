<template>
  <div id="app">
    <!--因为每次去到detail都是请求新的数据，要重新执行请求数据所以要除了detail-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

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
