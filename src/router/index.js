import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("../views/home/home")
const Category = () => import('../views/category/category')
const Shopcart = () => import('../views/shopcart/shopcart')
const Profile = () => import('../views/profile/profile')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/shopcart',
      component: Shopcart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      //加了冒号就是一个params，一个参数
      path: '/detail/:iid',
      component: Detail
    },
  ],
  mode: 'history'
})

export default router