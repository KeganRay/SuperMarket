<template>
  <div class="DetailItem">
    <Navbar>
      <div slot="left" class="back" @click="backtostep"><img src="~assets/img/common/back.svg"></div>
      <div slot="center" class="Detailtitle">
        <div v-for="(item,index) in titles"
             class="title-item"
             @click="itemclick(index)"
             :class="{active:currentIndex == index}"
             >{{ item }}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar/Navbar";

export default {
  name: "DetailItem",
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit('titleclick',index)
    },
    backtostep(){
      this.$router.back()
    }
  },
  components: {
    Navbar
  },

}
</script>

<style scoped>
.active{
  color: var(--color-high-text);
}

.back img {
  width: 17px;
  height: 17px;
}

.Detailtitle {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 13px;
}
</style>