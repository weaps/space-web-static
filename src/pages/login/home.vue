<template>
  <div class="public-login">
    <!--<h1>我是登录页面</h1>-->
  </div>
</template>

<script>
import { rootUrl } from "@/common/js/config";
import { getHomePage } from "@/api/auth";
import { ReturnCode } from "../../common/js/config";

export default {
  name: "home",
  created() {
    // 如果登录了，首页请求返回当前用户的首页路由，如果未登录，返回的跳转地址为登录的路由
    let that = this;
    getHomePage()
      .then(res => {
        if (res.code == ReturnCode.success) {
          that.$router.push(res.data);
        } else {
          that.$router.push("/login");
        }
      })
      .catch(err => {
        that.$router.push("/login");
      });
  },
};
</script>

<style scoped>
</style>
