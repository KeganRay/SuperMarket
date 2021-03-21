<template>
  <div class="GoodsItem" @click="itemClick">
    <img :src="GoodsItem.show.img" alt="" @load="imgload">
    <div class="Goods-info">
      <p>{{ GoodsItem.title }}</p>
      <span class="price">${{ GoodsItem.price }}</span>
      <!--收藏的个数-->
      <span class="collect">{{ GoodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "GoodsItem",
  props: {
    GoodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    //图片加载完成发射事件出去home.vue
    imgload(){
      this.$bus.$emit('imgload');
    },
    itemClick(){
      //改变网页
      this.$router.push('/detail/' + this.GoodsItem.iid)//给URL拼接上这个详情页面对象里面的id
    }
  }
}

</script>

<style scoped>
.GoodsItem {
  padding-bottom: 40px;
  position: relative;
}

.GoodsItem img {
  width: 100%;
  border-radius: 5px;
}

.Goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.Goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;/*如果超出了就用三个点表示*/
  white-space: nowrap;/*规定段落中的文本不换行*/
  margin-bottom: 3px;
}

.Goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.Goods-info .collect {
  position: relative;
}

.Goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>