import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './http/http';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

router.beforeEach((to,from,next)=>{
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    alert('您还没有登录，请先登录');
    next('/login');
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
