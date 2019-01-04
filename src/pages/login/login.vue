<template>
  <div class="public-login">
    <!--<h1>我是登录页面</h1>-->
  </div>
</template>

<script>
import { rootUrl } from "@/common/js/config";

export default {
  name: "login",
  created() {
    window.location = rootUrl.loginURL;
  },
};
</script>

<style scoped>
</style>
