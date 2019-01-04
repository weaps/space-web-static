<template>
  <div>
    <h1>我是测试页面 2</h1><br/>
    <router-link to="/page1">Go to page1</router-link>
    <br/>
    <public-header/>
  </div>
</template>

<script>
  import PublicHeader from '@/components/public-header/public-header'
  import {mapGetters} from 'vuex'

  export default {
    name: "page2",
    data() {
      return {}
    },
    components: {
      PublicHeader
    }
  }
</script>

<style scoped>

</style>
