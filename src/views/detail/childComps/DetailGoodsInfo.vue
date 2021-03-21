<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <!--显示的文字，如穿着效果-->
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <!--历图片-->
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      <!--加载完图片就调用imgload方法-->
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      //加载完一张图片counter就加一
      this.counter += 1
      //只有加载完最后一张才刷新
      if (this.counter === this.imagesLength) {
        this.$emit('imageLoad')//加载完发送事件让页面刷新
      }
    }
  },
  watch: {
    detailInfo(newvalue) {
      this.imagesLength = this.detailInfo.detailImage[0].list.length//统计有多少张图片
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start, .info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

/*弄黑点*/
.info-desc .start::before, .info-desc .end::after {
  content: ''; /*没有文本就只显示颜色*/
  width: 5px;
  height: 5px;
  background-color: #333;
  position: absolute;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
