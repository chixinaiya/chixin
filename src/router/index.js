//导入
import VueRouter from 'vue-router'
//注册
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)
//初始化
const router = new VueRouter({

  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Home,
    children:[
      { path: '/', component: Welcome}
    ] 
  },
  {path:'*',component:NotFound}
  ]
  // 路由规则
})
//导出
export default router