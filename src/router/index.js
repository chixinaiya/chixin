//导入
import VueRouter from 'vue-router'
//注册
import Vue from 'vue'
import auth from '@/utils/auth'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'


Vue.use(VueRouter)
//初始化
const router = new VueRouter({

  routes: [
    { path: '/login', component: Login },
    {
      path: '/', component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans }
      ]
    },
    { path: '*', component: NotFound }
  ]
  // 路由规则
})
//前置导航守卫
router.beforeEach((to, from, next) => {
  //除去/login路由跳转，其他都需要本地存储token，才能放行
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  next()
})
//导出
export default router