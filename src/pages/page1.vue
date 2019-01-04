<template>
  <div>
    <public-header/>
    <h1>我是测试页面 1</h1><br/>
    <router-link to="/page2">Go to page2</router-link>
    <br/>
    <h1>{{news.title}}</h1>
    <br/>
    <h2>{{news.content}}</h2>
    
    <public-footer/>
  </div>
</template>

<script>
import PublicHeader from '@/components/public-header/public-header'
import PublicFooter from '@/components/public-footer/public-footer'

import { mapActions} from 'vuex'
import {getUserInfo, getNews, getTopNewsFromModule} from '@/api/page1-api'
import {ERR_OK} from '@/common/js/config'

export default {
  name: "page1",
  data () {
    return {
      news: {}
    }
  },
  created () {
    console.log(this.$route.path)
    // this._getUserInfo()
  },
  mounted () {
    this._getNews()
    this._getTopNewsFromModule()
  },
  computed: {},
  methods: {
    ...mapActions(['setUserInfo']),
    _getUserInfo () {
      let account = 'mszuo'
      getUserInfo(account).then(res => {
        if (res.code === ERR_OK) {
          let data = res.data
          if (!data) {
            this.setUserInfo(data)
          } else {
            this.$message.error('error msg')
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    _getNews () {
      getNews().then((res) => {
        this.news = res.data
      })
    },
    _getTopNewsFromModule () {
      getTopNewsFromModule().then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    PublicHeader,
    PublicFooter
  }
}
</script>

<style scoped>

</style>
