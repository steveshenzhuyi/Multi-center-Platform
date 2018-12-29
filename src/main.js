// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import global_ from "./components/Global";
import "../settings.js";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
Vue.prototype.$axios = axios;

// 全局变量 配置
Vue.prototype.GLOBAL = global_;

window.Event = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
