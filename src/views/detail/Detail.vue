<template>
  <div id="detail">
    <!--    导航-->
    <DetailNavbar @titleclick="titleclick" ref="DetailNavbar"></DetailNavbar>
    <!--    可滚动部分-->
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scrolling="scrollingDetail">
      <!--      轮播图-->
      <DetailSwiper :SwiperImg="this.Swiperimg" :showIndicator="true"></DetailSwiper>
      <!--      商品的基础信息-->
      <DetailBaseInfo :goods="Goods"></DetailBaseInfo>
      <!--      商家的信息-->
      <DetailShopInfo :shop="Shop"></DetailShopInfo>
      <!--      下面的介绍以及介绍的图片-->
      <DetailGoodsInfo :detailInfo="detailinfo" @imageLoad="imageload"></DetailGoodsInfo>
      <!--      商品的尺码之类的参数-->
      <DetailParamInfo :paramInfo="GoodsParam" ref="paraInfo"></DetailParamInfo>
      <!--      商品的评价-->
      <DetailCommentInfo :commentInfo="Comment" ref="commentInfo"></DetailCommentInfo>
    </Scroll>
    <DetailBottomBar></DetailBottomBar>
    <!--    组件的点击不能直接用@click，要加上.native-->
    <Backtotop @click.native="backtotopclick"></Backtotop>
  </div>
</template>

<script>
//1、导入组件
import DetailNavbar from "@/views/detail/childComps/DetailNavbar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";//商品基本信息
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";//商家信息
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";//导入商品信息
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";//商品尺码参数
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";//评论
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";//底部导航栏
import Backtotop from "@/components/content/Backtotop/Backtotop";//回到顶部
import Scroll from "@/components/common/scroll/Scroll";

//2、导入方法
import {getDetail, Goods, Shop, GoodsParam} from "@/network/Detail";
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      Swiperimg: [],
      Goods: {},
      Shop: {},
      detailinfo: {},
      GoodsParam: {},
      Comment: {},
      saveY: [0, 1000, 2000],
      getthemeY: null,
      currentIndex: 0
    }
  },
  methods: {
    // 加载完图片要执行的函数
    imageload() {
      this.$refs.scroll.refresh()
      //当图片加载完才去获取Y
      this.getthemeY()
    },
    //点击导航栏改变位置
    titleclick(index) {
      console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -(this.saveY[index]), 300)
    },
    //滚动的时候动态改变导航条的颜色
    /*
    * 0<position<saveY[0]---> index=0
    * saveY[1]<position<save[2]---> index=1
    *
    * */
    scrollingDetail(position) {
      let positionY = -position.y
      const length = this.saveY.length
      for (let i = 0; i < length; i++) {
        //分为两个部分
        if (
            (i < (length - 1) && this.saveY[i] <= positionY && positionY < this.saveY[i + 1])
            ||
            //最后一个
            (i == (length - 1) && positionY >= this.saveY[i])) {
          this.currentIndex = i
          this.$refs.DetailNavbar.currentIndex = i
        }
      }
    },
    backtotopclick() {
      this.$refs.scroll.backtotop(0, 0, 500)
    }
  },
  components: {
    Backtotop,
    DetailCommentInfo,
    Scroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar
  }
  ,
  created() {
    //在URL里面提取信息，把参数拿过来
    this.iid = this.$route.params.iid
    // console.log(this.iid);

    //获得这个数据对象之后
    getDetail(this.iid).then(result => {
      // console.log('detail的数据对象'+result);
      //1、获取轮播图的图片数据
      this.Swiperimg = result.data.result.itemInfo.topImages
      //做一个提取
      const data = result.data.result
      //获取商品基本信息
      this.Goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取商家基本信息
      this.Shop = new Shop(data.shopInfo)
      //详情介绍和图片
      this.detailinfo = data.detailInfo
      //尺码信息
      this.GoodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //评论信息
      this.Comment = data.rate.list[0]
    }),
        /*
         * 1、不能直接在获取完值之后直接获取offsetTop，因为组件里面的Dom压根没开始渲染
         * 2、也不能在mounted里面获取，因为挂在玩可能数据还没到，因为数据是一个异步操作
         * 3、也不能使用nextTick，因为即使dom渲染完了，但是图片还没加载完
         */
        //请求完数据的时候再去进行获取组件的offsetTop
        this.getthemeY = debounce(() => {
          this.saveY = []
          this.saveY.push(0)
          this.saveY.push(this.$refs.paraInfo.$el.offsetTop)
          this.saveY.push(this.$refs.commentInfo.$el.offsetTop)
          console.log(this.saveY);
        }, 200)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #ffffff;
  height: 100vh; /*设置高度为100%窗口高度*/
}

.content {
  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>