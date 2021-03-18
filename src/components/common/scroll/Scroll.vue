<template>
  <div class="scroll" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    //监听回到顶部的点击
    backtotop(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    //监听完成加载更多
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  mounted() {
    //1、当组件挂在完马上创建一个betterscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //控制div那种元素是否可以点击
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })
    //2、监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scrolling', position)
    })
    //3、监听加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('loadmore')
    })
  }
}
</script>

<style scoped>
.scroll {
  overflow: hidden;
}
</style>