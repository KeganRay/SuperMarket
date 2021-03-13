<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    如果是当前的状态就-->
    <div v-if="isActice"><slot name="item-active-icon"></slot></div>
    <div v-else><slot name="item-icon"></slot></div>
    <!--    加了冒号就是要使用下面的变量-->
    <div :style="activestyle"><!--:class="{active:isActice}"-->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    //todo 父组件向子组件传数据，用来接收
    //传过来的路径
    path: String,
    //活跃时的颜色
    activecolor: {
      type:String,
      default:"red"
    }
  },
  data() {
    return {
      // isActice:true,
    }
  },
  computed: {
    isActice() {
      /*
      * this.$router.path为(/home)  ---> this.path(/home) == 1
      * this.$router.path为(/home)  ---> this.path(/category) == -1
      * this.$router.path为(/home)  ---> this.path(/shopcart) == -1
      * this.$router.path为(/home)  ---> this.path(/profile) == -1
      *
      * 如果indexof左边没有检索到右边的字符串则返回-1
      *  */
      return (this.$route.path.indexOf(this.path)) != -1
    },
    activestyle() {
      //当前活跃就用activecolor
      return this.isActice ? { color:this.activecolor} : {}
    }
  },
  methods: {
    itemClick() {
      console.log(this.path);
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  height: 49px;
  flex: 1;
  text-align: center;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle; /*消除底部默认的3px*/
  margin-bottom: 2px;
}

.active {
  color: #FE6A86;
}
</style>
