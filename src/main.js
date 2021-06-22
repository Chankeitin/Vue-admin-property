import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//导入字体样式
import './assets/font/iconfont.css'
// 全局样式表
import './assets/css/global.css'
//导入axios
import axios from 'axios'
//markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from 'echarts'
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts


Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(mavonEditor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
