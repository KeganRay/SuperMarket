<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="图片" @load="imgload">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index"

export default {
  name: "homeSwiper",
  data(){
    return{
      isload:false
    }
  },
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imgload(){
      if (!this.isload) {
        this.$emit('swiperImageload')
        this.isload=true
      }
    }
  }
}
</script>

<style scoped>

</style>