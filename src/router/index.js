import Vue from "vue";
import Router from "vue-router";
import { ClassSpaceRouter } from "@/router/class-space-router";

//下面是页面跳转路由

// 下面是异常跳转路由配置：
const Login = () => import("@/pages/login/login");
const Home = () => import("@/pages/login/home");
const PageUnauth = () => import("@/pages/unauth/unauth");

//下面是测试demo路由
const myupload = () => import("@/pages/test/myupload");

Vue.use(Router);

export default new Router({
  routes: [
    // 班级空间路由
    ...ClassSpaceRouter,
    {
      path: "/",
      redirect: "/home",
      // name: 'myupload',
      // component: myupload,
      meta: { requiresAuth: false },
    },
    // {
    //   path: "/class-space",
    //   name: "ClassSpace",
    //   component: Layout,
    //   meta: { requiresAuth: false },
    //   redirect: "/class-space/home",
    //   children: [
    //     // 班级空间首页
    //     {
    //       path: "home",
    //       name: "Home",
    //       component: CSHome,
    //       meta: { requiresAuth: false },
    //     },
    //   ],
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/unauth",
      name: "PageUnauth",
      component: PageUnauth,
      meta: { requiresAuth: false },
    },
    {
      path: "/myupload",
      name: "myupload",
      component: myupload,
      meta: { requiresAuth: false },
    },
  ],
});
