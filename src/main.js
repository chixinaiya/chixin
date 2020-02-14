import Vue from 'vue'
import App from './App.vue'

//导入自己配置的axios

import axios from '@/api'

//导入路由
//import router from './router/index.js'
//1.router/index.js  省略 router 默认访问index.js文件
//2. ./ ../ 去找到相应的目录并不是很准确  使用vue-cil提供的@（src路径）路径
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自己的样式，注意写在饿了么样式下方，才能覆盖样式
// 引入之后，作用与每个组件，全局样式
import '@/styles/index.less'

import plugin from '@/plugin'
Vue.use(plugin)

Vue.use(ElementUI)
Vue.config.productionTip = false

//挂载$http 对象就是axios
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
