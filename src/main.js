// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import store from "./store";

import { isAuthUrl } from "@/api/auth";
import "babel-polyfill";
import { loggedIn } from "@/api/auth";
import VueBus from "vue-bus";
import { httpGet, httpPost, httpPostJson } from "@/common/js/util";
import { rootUrl, ReturnCode } from "@/common/js/config";

Vue.use(VueBus);

Vue.config.productionTip = false;
axios.defaults.timeout = 60 * 1000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype.$axios = axios;
Vue.prototype.$httpGet = httpGet;
Vue.prototype.$httpPost = httpPost;
Vue.prototype.$httpPostJson = httpPostJson;
Vue.prototype.$rootUrl = rootUrl;
Vue.prototype.$returnCode = ReturnCode;

var __ecsSafetyToken__ = ""; //csrfToken

// 路由跳转统一处理
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    (async () => {
      let ret = await loggedIn();
      console.log(ret);
      // 判断是否登录
      if (ret === "noLogin") {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        // 登录有效，判断是否有权限
        if (ret === "noAuth") {
          // 无权限
          next("/unauth");
        } else {
          console.log(ret);
          // 有权限
          // next()
          isAuthUrl(to.fullPath).then(res => {
            if (res.code == ReturnCode.success) {
              next();
            } else {
              next("/unauth");
            }
          });
        }
      }
    })();
  } else {
    next();
  }
});

// 请求头统一拦截处理
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["ecssafetytoken"] = __ecsSafetyToken__;
    if (!config.params) {
      config.params = {};
    }
    config.params.timeoutTmp = new Date().getTime();
    // debugger;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// 接收响应时处理响应 
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    if (response.headers["ecssafetytoken"]) {
      //从头中获取csrfToken
      __ecsSafetyToken__ = response.headers["ecssafetytoken"];
    }
    return response;
  },
  function(error) {
    // 无权限或者异常请求，统一在此处拦截跳转到其它页面
    // Do something with response error
    if (!error.response) {
      return Promise.reject(error);
    } else if (error.response.headers["sessionstatus"] === "no") {
      router.push("/login");
    } else if (error.response.headers["authoritystatus"] === "no") {
      // 无权限
      router.push("/unauth");
    }
    return Promise.reject(error);
  },
);

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
