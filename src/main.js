import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css
import Components from '@/components' //引入自定义组件
import App from './App'
import store from './store'
import router from './router'
import * as directive from '@/directive'
import * as filters from '@/filters'
import '@/icons' // icon
import '@/permission' // permission control
import Print from 'vue-print-nb'
Vue.use(Print)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(Components) //注册自定义组件

//Object.keys(directive)转换成数组，es6的写法
Object.keys(directive).forEach(item=>{
  Vue.directive(item,directive[item])//注册自定义属性
})

Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])//注册自定义过滤器
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
