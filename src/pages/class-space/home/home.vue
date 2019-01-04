<template>
  <div>
    我是班级空间首页
  </div>
</template>

<script>
import * as API from "@/api/class-space/home-api.js";

export default {
  created() {
    this.getDemo();
  },
  data() {
    return {};
  },
  methods: {
    getDemo() {
      API.getClassInfoDemo().then(res => {
        console.log("result: ", res);
        if (res.code === this.$returnCode.success) {
        } else {
        }
      });
    },
  },
  components: {},
};
</script>

<style scoped>
</style>
