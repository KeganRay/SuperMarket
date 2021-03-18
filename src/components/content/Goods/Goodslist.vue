<template>
  <div class="Goodlist">
    <GoodsItem class="item" v-for="item in goods" :GoodsItem="item"></GoodsItem>
  </div>
</template>

<script>

import GoodsItem from "@/components/content/Goods/GoodsItem";

export default {
  name: "Goodslist",
  components: {GoodsItem},
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.Goodlist {
  display: flex;
  flex-wrap: wrap;/*同一行自动换行*/
  padding: 5px;
  justify-content: space-around;/*如何分配空白空间*/
}

.Goodlist .item {
  width: 48%;
}
</style>