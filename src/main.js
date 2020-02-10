import Vue from 'vue'
import App from './App.vue'

//导入axios

import axios from '@/api'

//导入路由
//import router from './router/index.js'
//1.router/index.js  省略 router 默认访问index.js文件
//2. ./ ../ 去找到相应的目录并不是很准确  使用vue-cil提供的@（src路径）路径
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

//挂载$http 对象就是axios
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
