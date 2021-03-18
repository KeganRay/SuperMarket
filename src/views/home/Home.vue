<template>
  <div id="home">
    <!--1、设置导航条-->
    <Navbar class="home_Navbar">
      <div slot="center">乐活街</div>
    </Navbar>

    <!--7、将要滚动的东西放到Better scroll里面-->
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            :pull-up-load="true"
            @scrolling="contentScroll"
            @loadmore="loadmore">
      <!--2、设置轮播图-->
      <HomeSwiper :banners="banners"></HomeSwiper>
      <!--3、设置下面的几个球的推荐-->
      <HomeRecommand :recommends="recommends"></HomeRecommand>
      <!--4、设置图片链接-->
      <HomeFeature></HomeFeature>
      <!--5、设置组件导航器-->
      <Tabbarcontrol class="Tabbarcontrol"
                     :titles="['流行','新款','精选']"
                     @Tabbarclick="Tabbarclick">
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
    }
  },
  computed: {
    showgoods() {
      return this.goods[this.Currenttype].list
    }
  },
  methods: {
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
            console.log(this.goods[type].list);
          }).catch(error => {
        console.log(error)
      })
    },
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
    },
    //监听回到顶部的点击
    totopclick() {
      this.$refs.scroll.backtotop(0, 0, 500)
    },
    //监听网页移动的位置，如果超过1000，就显示回到顶部的按钮
    contentScroll(position) {
      this.isshowBacktotop = (-position.y) > 1000
    },
    //加载更多图片
    loadmore(){
      //1、加载当前currentType的数据
      this.getProductData(this.Currenttype)
      //2、刷新scroll
      this.$refs.scroll.scroll.refresh()
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
  }
}
</script>

<style scoped>
#home {
  height: 100vh; /*视口高度，100%的视口高度*/
  position: relative;
}

.home_Navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.home_Navbar div {
  color: white;
}

.Tabbarcontrol {
  position: sticky;
  top: 44px;
  z-index: 9;
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