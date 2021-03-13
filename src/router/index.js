import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("../views/home/home")
const Category = () => import('../views/category/category')
const Shopcart = () => import('../views/shopcart/shopcart')
const Profile = () => import('../views/profile/profile')

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
  ],
  mode: 'history'
})

export default router