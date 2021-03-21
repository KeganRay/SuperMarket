<template>
  <div>
    <Swiper class="wholeSwiper" :showIndicator="this.showIndicator">
      <!--动态遍历有多少个照片-->
      <SwiperItem v-for="item in SwiperImg">
        <!--因为要使用到item，所以要加：-->
        <img :src="item">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "DetailSwiper",
  props: {
    SwiperImg: {
      type: Array,
      default() {
        return []
      }
    },
    showIndicator:{
      type:Boolean,
      default:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.wholeSwiper{
  height: 250px;
  overflow: hidden;
}
</style>