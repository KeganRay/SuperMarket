<template>
  <div id="home">
    <!--1、设置导航条-->
    <Navbar class="home_Navbar">
      <div slot="center">乐活街</div>
    </Navbar>
    <Tabbarcontrol
        :titles="['流行','新款','精选']"
        @Tabbarclick="Tabbarclick"
        ref="Tabbarcontrol1"
        class="Tabbarcontrol"
        v-show="isTabbarFixed">

    </Tabbarcontrol>
    <!--7、将要滚动的东西放到Better scroll里面-->
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            :pull-up-load="true"
            @scrolling="contentScroll"
            @loadmore="loadmore">
      <!--2、设置轮播图-->
      <HomeSwiper :banners="banners" @swiperImageload="swiperImageload"></HomeSwiper>
      <!--3、设置下面的几个球的推荐-->
      <HomeRecommand :recommends="recommends"></HomeRecommand>
      <!--4、设置图片链接-->
      <HomeFeature></HomeFeature>
      <!--5、设置组件导航器-->
      <Tabbarcontrol
          :titles="['流行','新款','精选']"
          @Tabbarclick="Tabbarclick"
          ref="Tabbarcontrol2">
      </Tabbarcontrol>
      <!--6、设置商品-->
      <Goodslist :goods="showgoods"></Goodslist>
    </Scroll>

    <!--8、设置回到顶部的按钮-->
    <Backtotop @click.native="totopclick" v-show="isshowBacktotop"></Backtotop>
  </div>
</template>

<script>
//导入公共组件
import Navbar from "@/components/common/Navbar/Navbar";
import Tabbarcontrol from "@/components/content/Tabbarcontrol/Tabbarcontrol";
import Scroll from "@/components/common/scroll/Scroll";
import Backtotop from "@/components/content/Backtotop/Backtotop";

//导入组件
import HomeSwiper from "./home_ChildComponent/homeSwiper"
import HomeRecommand from "@/views/home/home_ChildComponent/homeRecommend";
import HomeFeature from "@/views/home/home_ChildComponent/homeFeature";
import Goodslist from "@/components/content/Goods/Goodslist";

//导入方法
import {getMultidata, getProductData} from "@/network/home";
import {debounce} from "@/common/utils";

export default {
  name: "home",
  components: {
    Goodslist,
    Tabbarcontrol,
    HomeFeature,
    HomeRecommand,
    Navbar,
    HomeSwiper,
    Scroll,
    Backtotop
  },
  data() {
    return {
      //轮播图的数据
      banners: [],
      //四个推荐球的数据
      recommends: [],
      //商品的数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      //当前商品显示的页面
      Currenttype: 'pop',
      //是否显示回到顶部的按钮
      isshowBacktotop: false,
      //记录控制栏滚动的距离
      Tabbarcontrol_offsetTop: 0,
      //是否吸顶
      isTabbarFixed: false,
      //记录Y轴位置
      SaveY:0
    }
  },
  methods: {
    /*
    * todo 获取数据的方法
    * */
    getMultidata() {
      getMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getProductData(type) {
      //不用goods.type的原因是type是字符串这样回找不到，[]可以传变量、参数、表达式
      //这样写的目的是可以复用，用完再拿到下一页的数据
      const page = this.goods[type].page + 1
      getProductData(type, page)
          .then(result => {
            //把所有数据逐个逐个塞进去
            // for (let item of result.data.data.list){
            //   this.goods[type].list.push(item)
            // }
            this.goods[type].list.push(...result.data.data.list)//这种语法等于上面的for循环，就是把括号里面的列表逐个逐个放到外面的数组
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()
            // console.log(this.goods[type].list);
          }).catch(error => {
        console.log(error)
      })
    },

    /*
    * todo 监听方法
    * */
    //监听Tabbar的点击动态更改当前显示的页面
    Tabbarclick(index) {
      switch (index) {
          // index=0的时候
        case 0:
          this.Currenttype = 'pop';
          break;
        case 1:
          this.Currenttype = 'new';
          break;
        case 2:
          this.Currenttype = 'sell';
          break;
      }
      this.$refs.Tabbarcontrol1.currentIndex=index
      this.$refs.Tabbarcontrol2.currentIndex=index
    },
    //监听回到顶部的点击
    totopclick() {
      this.$refs.scroll.backtotop(0, 0, 500)
    },
    //监听网页移动的位置
    contentScroll(position) {
      //如果超过1000，就显示回到顶部的按钮
      this.isshowBacktotop = (-position.y) > 1000
      //如果超过动态计算的tabbar的offset就吸顶
      // todo 但是因为嵌套在betterscroll里面所以会一起滚上去了
      this.isTabbarFixed = (-position.y) > this.Tabbarcontrol_offsetTop
    },

    //加载更多图片
    loadmore() {
      //1、加载当前currentType的数据
      this.getProductData(this.Currenttype)
      //2、刷新scroll
      this.$refs.scroll.refresh()
    },
    //轮播图加载完成计算高度
    swiperImageload() {
      // console.log(this.$refs.Tabbarcontrol.$el.offsetTop);
      this.Tabbarcontrol_offsetTop = this.$refs.Tabbarcontrol2.$el.offsetTop

    }
  },
  computed: {
    showgoods() {
      return this.goods[this.Currenttype].list
    }
  },
  //生命周期函数，一创建就请求数据
  created() {
    //获得轮播图和四个球的数据数据
    this.getMultidata()

    //获得商品数据
    this.getProductData('pop')
    this.getProductData('new')
    this.getProductData('sell')

  },
  //在mounted里面做监听目的是让组件挂载完之后才监听，不然可能会拿到null或者undefined
  mounted() {
    //使用debounce对refresh进行一个防抖的优化处理
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    //监听goodsitem图片加载完成调用refresh重新计算高度
    this.$bus.$on('imgload', () => {
      refresh()
    })

    // this.Tabbarcontrol_offsetTop = this.$refs.Tabbarcontrol.$el.offsetTop
    // console.log(this.Tabbarcontrol_offsetTop);
  },
  activated() {
    // console.log(this.SaveY);
    this.$refs.scroll.scroll.scrollTo(0,this.SaveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.SaveY=this.$refs.scroll.getScrollY
  }
}
</script>

<style scoped>
#home {
  height: 100vh; /*视口高度，100%的视口高度*/
  position: relative;
}

.home_Navbar{
  background-color: var(--color-high-text);
}

.Tabbarcontrol{
  position: relative;
  top: -1px;
  z-index: 9;
}

.home_Navbar div {
  color: white;
}

.content {
  position: absolute;
  top: 44px; /*头顶有一个44px的导航栏*/
  bottom: 49px; /*底部有一个44px的导航栏*/
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>