<template>
  <div id="home">
    <!--1、设置导航条-->
    <Navbar>
      <div slot="left"></div>
      <div slot="center">乐活街</div>
      <div slot="right"></div>
    </Navbar>
    <!--2、设置轮播图-->
    <homeSwiper :banners="banners"></homeSwiper>
    <!--3、设置下面的几个球的推荐-->
    <home-recommand :recommends="recommends"></home-recommand>

  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {getMultidata} from "@/network/home";
import homeSwiper from "./home_ChildComponent/homeSwiper"
import HomeRecommand from "@/views/home/home_ChildComponent/homeRecommend";


export default {
  name: "home",
  components: {
    HomeRecommand,
    Navbar,
    homeSwiper
  },
  data() {
    return {
      //轮播图的数据
      banners: [],
      //四个球的推荐
      recommends: []
    }
  },
  //生命周期函数，一创建就请求数据
  created() {
    //获得轮播图数据
    getMultidata().then(res => {
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })

  }
}
</script>

<style scoped>
#home {
  /*background-color: #FE6A86;*/
  color: white;
}


</style>