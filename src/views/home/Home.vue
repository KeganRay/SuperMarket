<template>
  <div id="home">
    <Navbar>
      <div slot="left">左边</div>
      <div slot="center">乐活街</div>
      <div slot="right">右边</div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {getMultidata} from "@/network/home";


export default {
  name: "home",
  components: {
    Navbar
  },
  data() {
    return {
      banners:[]
    }
  },
  //生命周期函数，一创建就请求数据
  created() {
    getMultidata().then(res => {
      this.banners = res
    })
  }
}
</script>

<style scoped>
#home {
  background-color: #FE6A86;
  color: white;
}


</style>