import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './http/http';
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

router.beforeEach((to, from, next) => {
  //我在这里模仿了一个获取用户信息的方法
let isLogin = window.sessionStorage.getItem('User');
  if (isLogin) {
      //如果用户信息存在则往下执行。
      next()
  } else {
      //如果用户token不存在则跳转到login页面
      if (to.path === '/login') {
          next()
      } else {
          next('/login')
      }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
