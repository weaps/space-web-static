<template>
  <div>
    <h1>上传测试</h1>
    <ul>
      <li v-for="(file,inx) in fileList" v-bind:key="inx">
        <span>名称：{{file.name}}</span><span>地址：{{file.url}}</span>
        <!-- <img :src="file.url"/> -->
      </li>
    </ul>
    <!--属性说明
    1.serverinfo[Object]属性用来配置文件服务信息：{appName,server,debug}
    2.ext[String]属性配置文件后缀名，逗号分隔
    3.fileCountLimit[Number]属性限制上传的文件个数
    4.fileSizeLimit[Number]属性限制当个文件最大值值
    tips[String]属性设置提示语，如可上传png/jpg/jpeg/mp3/mp4/pdf，大小不超过200M
    事件说明：
    1.fileChange事件，文件选择并上传成功后触发（多次上传多次触发），事件返回的是上传的文件列表数组
    -->
    <!--
    <FileUpload :serverinfo="serverInfo" :ext="ext" :needThumb="needThumb" :fileCountLimit="fileCountLimit" :tips="tips" v-on:fileChange="getFileList">aaa</FileUpload>
    -->

    <FileUploadExt :serverinfo="serverInfo" :ext="ext" :needThumb="needThumb" :fileCountLimit="fileCountLimit" :tips="tips" v-on:fileChange="getFileList">aaa</FileUploadExt>

  </div>
</template>
<script>
// import {file-upload} from '@/components/index.js'
// let file-upload = () => import('@/components/file-upload-bak.vue')
// let file-upload = require('@/components/file-upload-bak.vue')
// let file-upload = require('fileUploader')
// const fileUpload =  require('@/components/file-upload/file-upload').default;
// const imgUpload =  require('@/components/file-upload/img-upload').default;

import FileUploadExt from "@/components/file-upload/file-upload-ext";
import { rootUrl, CystorageInfo } from "@/common/js/config";
export default {
  name: "hello",
  components: {
    FileUploadExt,
  },
  data() {
    return {
      //cystorage文件服务配置信息
      // CystorageInfo: {
      //   appName: 'ledc_rrt',// * AppName，必需
      //   server: 'http://cystorage.ledc.changyan.cn',    // * 文件服务地址，必需
      //   tokenUrl: rootUrl.getToken,//获取cystorage的token请求地址
      //   debug: true, // 关闭或打开日志开关，不写默认为打开
      // },
      fileList: [],
      //文件上传服务器配置信息
      // serverInfo:  {
      //   appName: 'ledc_rrt',// * AppName，必需
      //   server: 'http://cystorage.ledc.changyan.cn',    // * 文件服务地址，必需
      //   tokenUrl: '',//获取cystorage的token请求地址
      //   debug: true, // 关闭或打开日志开关，不写默认为打开
      // },
      serverInfo: CystorageInfo(),
      //文件扩展名限制，如jpg,png,pdf
      ext: "jpg,png",
      //提示信息
      tips: "如果是交付项目或者平台占位，请上传相关附件（合同/协议/建设方案等），以便审核",
      //文件数量限制
      fileCountLimit: 4,
      //是否展示缩略图
      needThumb: true,
    };
  },
  created() {},
  methods: {
    getFileList: function(data) {
      this.fileList = data;
      console.log(this.fileList);
    },
  },
};
</script>
