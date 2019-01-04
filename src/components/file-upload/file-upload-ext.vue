<template>
  <div :class="className">
    <div>
      <!--<div>-->
        <!--&lt;!&ndash;用来存放item&ndash;&gt;-->
        <!--<div :id="'fileList-'+id" class="uploader-list"></div>-->
        <!--<div :id="'picker-'+id">选择图片</div>-->
      <!--</div>-->
      <div>
        <div class="upload-group" @mouseover="_clickRefresh">
          <div class="upload-preview" :id="'preview-'+id"></div>
          <div v-show="hiddenBtn == false">
            <div class="upload-place-wrap" v-show="disabled == true">
              <div class="upload-place-pic"></div>
              <p>{{btntext}}</p>
            </div>
            <div class="upload-place-wrap" :id="'picker-'+id" v-show="disabled == false">
              <div class="upload-place-pic"></div>
              <p>{{btntext}}</p>
            </div>
          </div>
          <div :class="{'upload-file-wrap':true,'hiddenBtn': hiddenBtn}">
            <div class="upload-file-item-wrap clearfix uploader-list" :id="'fileList-'+id" >
              <!--&lt;!&ndash;双飞翼布局&ndash;&gt;-->
              <!--&lt;!&ndash;中间&ndash;&gt;-->
              <!--<div class="file-upload-process-wrap">-->

                <!--<div class="just-wrap">-->
                  <!--<div class="file-upload-process-outer">-->
                    <!--<div class="file-upload-process-inner"></div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash;左边&ndash;&gt;-->
              <!--<div class="upload-file-type-wrap">-->
                <!--<em class="file-type-icon file-type-icon-doc">平台通知文档.doc</em>-->
              <!--</div>-->
              <!--&lt;!&ndash;右边&ndash;&gt;-->
              <!--<i class="file-item-delete"></i>-->
            </div>
          </div>
          <p class="upload-tips tips-icon" v-if="!hiddenTips">{{tips}}</p>
        </div>
      </div>


    </div>
    <!--<div>
      <div class="btns">
        <div class="thumbContainer"><img/><span></span></div>
        <div :id="id" class="btns">选择图片</div>
        &lt;!&ndash;<button id="ctlBtn" class="btn btn-default">开始上传</button>&ndash;&gt;
        <span>{{tips}}</span>
      </div>
      &lt;!&ndash;用来存放文件信息&ndash;&gt;
      <div :id="'thelist-'+id" class="uploader-list"></div>
    </div>-->
  </div>
</template>
<script>
  // import '../../../static/resource/plugins/webuploader/scripts/jquery-1.9.1'
  // import './webuploader/scripts/jquery-1.9.1'
  // import WebUploader from '../../../static/resource/plugins/webuploader/scripts/webuploader-full.js'
  // import {WebUploader} from '/static/resource/webuploader/scripts/webuploader-full.js'
  // import CryptoJS from 'crypto-js'
  // import { Base64 } from 'js-base64'

  import $ from 'jquery'
  import {WebUploader} from './webuploader/scripts/webuploader-full.js'
  import axios from 'axios'
  import Qs from 'qs'
  // window.jQuery = jQuery
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  export default{
    name: 'file-upload-ext',
    props: {
      // 【事件说明】
      // 1.fileChange[Event]事件，当文件上传成功后或者删除文件时会触发，触发后传入当前上传成功的文件列表数组，数组内容格式如下
      // {
      //   contextId: "5b20b54383b2601b88c4c0e7",
      //   extension: "png",
      //   length: 342674,
      //   md5: "3b92337870eb81e426a5d3976e4aa6ff",
      //   url: "http://test.download.cycore.cn/xx/2018/6/13/14/4a761d39-dd31-4ab1-8051-d2f2fce4f7d6/1360x400.png"
      //   name: "文件名"
      // }
      // 2.add-file-before[Event]事件，当文件添加到队列之前时触发，执行自定义方法,此方法要生效，需在isBefore属性为true下使用
      // 【属性说明】
      //  serverinfo: {
      //       appName: 'ledc_rrt',                           // AppName，必需
      //       server: 'http://cystorage.ledc.changyan.cn',   // 文件服务地址，必需
      //       tokenUrl: '',                                   //获取cystorage的token请求地址，项目后台地址，
      //       debug: true,                                   // 关闭或打开日志开关，不写默认为打开
      //   }
      // 1.serverinfo[Object]属性用来配置文件服务信息：{appName,server,tokenUrl,baseUrl:"项目域名地址，兼容ie9时需要用到"}
      // 2.ext[String]属性配置文件后缀名，逗号分隔
      // 3.fileCountLimit[Number]属性限制上传的文件个数，默认1个
      // 4.fileSizeLimit[Number]属性限制文件总大小，单位：字节，默认100M
      // 5.fileSingleSizeLimit[Number]属性限制当个文件最大值值，单位：字节，默认100M
      // 6.id[String]属性，用于防止多个组件同时使用时picker元素id冲突问题，页面中所有元素的id都是以改id为后缀构成
      // 7.needThumb[Boolean]属性，是否需要显示图片预览图，默认true
      // 8.tips[String]属性上传提示说明文字，默认“请选择文件”
      // 9.className[String]属性切换按钮样式，textBtn标识使用文字按钮，空表示使用图片按钮
      // 10.needProcess[Boolean]属性控制是否显示进度条,进度条包括文件名称、进度条、删除按钮，默认true
      // 11.needErrorTips[Boolean]属性控制文件大小、数量、格式不满足时是否显示提示信息，默认true
      // 12.exceedFileCountLimitTips[String]属性文件数量超出时提示信息，默认"您选择的文件数量超出限制"
      // 13.exceedFileSizeLimitTips[String]属性文件大小超出时提示信息，默认"您选择的文件大小超出限制"
      // 14.extDenied[String]属性控制是否显示进度条，默认"您选择的类型不支持"
      // 15.mimeTypes[String]属性控制文件选择弹出框显示的文件类型，一般和参数配合来使用
      // 16.disabled[Boolean]属性控制是否禁用上传按钮，如果禁用，则点击不会弹出文件选择框，默认为false
      // 17.isMultiple[Boolean]属性控制选择上传的文件时是否可以一次性选择多张文件，如果是false,则每次只能选择一张图片，默认为true
      // 18.isBefore[Boolean]属性控制是否在文件添加到队列之前执行自定义的方法，与add-file-before[Event]事件结合使用，默认为 false

      id:  {
        type: String,
        default: function(){
          return "wu-"+parseInt(99999999*Math.random())
        }
      },
      serverinfo:  {
        type: Object,
        default: function(){
          return {}
        }
      },
      ext: {
        type: String,
        default: function(){
          return ''
        }
      },
      mimeTypes:{//弹出框显示的文件筛选参数
        type: String,
        default: ()=>{  return ''; }
      },
      fileCountLimit : {
        type: Number,
        default: function(){
          return 1
        }
      },
      fileSizeLimit:{
        type: Number,
        default: function(){
          return 100000000
        }
      },
      fileSingleSizeLimit:{
        type: Number,
        default: function(){
          return 100000000
        }
      },
      tips: {
        type: String,
        default: function(){
          return '请选择文件'
        }
      },
      btntext: {
        type: String,
        default: function(){
          return '上传'
        }
      },
      //是否需要生产图片预览图，默认不生成，大于0则生成
      needThumb:  {
        type: Boolean,
        default: function(){
          return false;
        }
      },
      className: {//textBtn标识使用文字按钮，空表示使用图片按钮
        type: String,
        default: function(){
          return "";
        }
      },
      //是否需要图片上传进度条，默认有
      needProcess:  {
        type: Boolean,
        default: function(){
          return true;
        }
      },
      needErrorTips: {//不满足条件时，是否需要弹出提示信息框
        type: Boolean,
        default: ()=>{return true;}
      },
      exceedFileCountLimitTips: {
        type: String,
        default: ()=>{return '您选择的文件数量超出限制'}
      },
      exceedFileSizeLimitTips: {
        type: String,
        default: ()=>{return '您选择的文件大小超出限制'}
      },
      extDenied: {
        type: String,
        default: ()=>{return '您选择的文件类型不支持'}
      },
      disabled: {//禁用上传按钮，可以配合fileChange事件来对上传按钮做控制
        type: Boolean,
        default: ()=>{return false;}
      },
      hiddenBtn : {//是否隐藏上传按钮，隐藏后只能看到上传的文件列表,可以配合fileChange事件来对上传按钮做控制
        type: Boolean,
        default: ()=>{return false;}
      },
      hiddenTips : {//是否隐藏提示信息
        type: Boolean,
        default: ()=>{return false;}
      },
      isMultiple:{//一次是否可以选择多个文件
        type: Boolean,
        default: ()=>{return true;}
      },
      isBefore:{//是否执行文件添加到队列之前的自定方法
        type: Boolean,
        default: ()=>{return false;}
      }
    },
    data(){
      return{
        fileList: [],
        uploader: "",
        mouserover: 0
      }
    },
    methods: {
      _warning(msg){
        this.$message({
          message: msg,
          type: 'warning'
        })
      },
      _loading(msg = '正在加载') {//加载遮罩层
        const loading = this.$loading({
          // target: '#'+id,
          lock: true,
          text: msg,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, -0.3)'
        });
        return loading;
      },
      init(){//初始化组件，只能初始化一次
        if(this.uploader == null || this.uploader == undefined){
          console.log('web uploader 实例创建')
          return;
        }
        var that = this;
        var uploader = WebUploader.create({
          //自动上传
          auto: true,
          // 选择文件按钮
          pick: {
            id:'#picker-'+that.id,
            multiple:that.isMultiple,
          },
          fileNumLimit: that.fileCountLimit,
          fileSingleSizeLimit: that.fileSingleSizeLimit,
          fileSizeLimit: that.fileSizeLimit,
          thumb: {
            width: 100,
            height: 100,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,
            // 是否允许裁剪。
            crop: true,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
          },
          // swf文件路径
          // swf: './scripts/Uploader.swf',
          swf: that.serverinfo.baseUrl+'/static/resource/js/Uploader.swf',
          // swf: 'http://mytest:8081/static/resource/js/Uploader.swf',
          // 文件接收服务端
          // server: 'http://localhost:8081/backend/upload/uploadtest.do/',
          // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
          resize: false,
          accept:{
            extensions: that.ext,
            mimeTypes : that.mimeTypes,
          },
          //下面是cystorage扩展属性
          extension: {
            appName: that.serverinfo.appName, // * AppName，必需
            debug: that.serverinfo.debug, // 关闭或打开日志开关，不写默认为打开
            server: that.serverinfo.server  // * 文件服务地址，必需
          },
          //   {
          //   appName: 'ledc_rrt',                              // * AppName，必需
          //   debug: true,                                 // 关闭或打开日志开关，不写默认为打开
          //   server: 'http://cystorage.ledc.changyan.cn'    // * 文件服务地址，必需
          // },

          // 回调方法
          callback: {
            // 获取上传文件所需Token的方法
            getToken: function (file) {
              var deferred = $.Deferred();
              var url = that.serverinfo.tokenUrl;
              axios.post(url,Qs.stringify({
                "md5": file.md5,
                "fileExt": file.ext,
                "chunks": file.chunks,
                "contextId": file.contextId    // ContextID可以为空值，若为空值则只返回prepareToken、md5Token及uploadToken信息，否则只返回chunkToken及completeToken信息
              })).then(function (response) {
                let data = response.data;
                file.md5Token = data.md5Token;            // 调用v2/files/check接口所需的Token
                file.uploadToken = data.uploadToken;      // 调用v2/files/upload接口所需的Token
                file.prepareToken = data.prepareToken;    // 调用v2/files/prepare接口所需的Token
                file.chunkToken = data.chunkToken;        // 调用v2/files/chunk/upload接口所需的Token
                file.completeToken = data.completeToken;  // 调用v2/files/complete接口所需的Token
                // debugger;
                deferred.resolve();
              });
              return deferred.promise();
            }
          }
        });
        uploader.on( 'error', function( errorType ) {
          if(errorType == 'Q_EXCEED_NUM_LIMIT'){
            that._warning(that.exceedFileCountLimitTips)
          }
          if(errorType == 'Q_EXCEED_SIZE_LIMIT' || errorType == 'F_EXCEED_SIZE'){
            that._warning(that.exceedFileSizeLimitTips)
          }
          if(errorType == 'Q_TYPE_DENIED'){
            that._warning(that.extDenied)
          }
        });
        /*添加文件之前触发*/
        uploader.on( 'beforeFileQueued', function( file ) {
          if(that.isBefore){
            that.$emit("add-file-before")
          }
        });
        //添加文件时触发
        uploader.on( 'fileQueued', function( file ) {
          var $list = $('#fileList-'+that.id);
          var $preview = $('#preview-'+that.id);
          var  $li,$img;
          if(that.needThumb){
            $li = $(
              '<div id="' + file.id + '">' +
              '<div class="file-upload-process-wrap">' +
              '       <div class="just-wrap">' +
              '          <div class="file-upload-process-outer">' +
              '            <div class="file-upload-process-inner"style="width: 1%;"></div>' +
              '          </div>' +
              '       </div>' +
              '</div>' +
              '<div class="upload-file-type-wrap">' +
              '     <em class="file-type-icon file-type-icon-doc" title="'+file.name+'">' + file.name + '</em>' +
              ' </div>' +
              ' <i class="file-item-delete remove-file"></i>' +
              '</div>');
            // $li = $(
            //   '<div id="' + file.id + '" class="file-item thumbnail">' +
            //   '<img>' +
            //   '<div class="info">' + file.name + '</div>' +
            //   '<span class="state"></span>' +
            //   '<a class="remove-file" style="cursor: pointer;color: blue;">移除</a>' +
            //   '</div>'
            // );
            // $img = $li.find('img');
            $img = $('<img  id="preview' + file.id + '">');
          }else {
            $li = $(
              '<div id="' + file.id + '">' +
              '<div class="file-upload-process-wrap">' +
              '       <div class="just-wrap">' +
              '          <div class="file-upload-process-outer">' +
              '            <div class="file-upload-process-inner" style="width: 1%;"></div>' +
              '          </div>' +
              '       </div>' +
              '</div>' +
              '<div class="upload-file-type-wrap">' +
              '     <em class="file-type-icon file-type-icon-doc" title="'+file.name+'">' + file.name + '</em>' +
              ' </div>' +
              ' <i class="file-item-delete remove-file"></i>' +
              '</div>');
            // $li = $(
            //   '<div id="' + file.id + '" class="file-item" style="margin:0px;">' +
            //   '<div class="info2">' + file.name + '</div>' +
            //   '<span class="state"></span>' +
            //   '<a class="remove-file" style="cursor: pointer;color: blue;">移除</a>' +
            //   '</div>'
            // );

          }
          if(that.needProcess == true){
            $list.append( $li );
          }
          $preview.append($img);
          $li.on('click', '.remove-file', function() {
            uploader.removeFile( file, true );
            $li.remove();
            // $img.remove();
            that.fileList = that.extractFileData(uploader.getFiles('complete'))//只提取complete状态的文件，删除的文件和失败的文件不提取
            // that.fileList = uploader.getFiles('complete');//只提取complete状态的文件，删除的文件和失败的文件不提取
            that.fileChange()//通过该事件将文件列表返回给父级组件
          });

          // 创建缩略图, 如果为非图片文件，可以不用调用此方法,thumbnailWidth x thumbnailHeight 为 100 x 100
          if(that.needThumb){
            uploader.makeThumb( file, function( error, src ) {
              if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
              }

              $img.attr( 'src', src );
            });
          }
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
          var $li = $( '#'+file.id ),
            $percent = $li.find('.file-upload-process-inner');
          // 避免重复创建
          // if ( !$percent.length ) {
          //   $percent = $('<p class="progress"><span></span></p>')
          //     .appendTo( $li )
          //     .find('span');
          // }

          $percent.css( 'width', percentage * 100 + '%' );
        });
        //上传成功后
        uploader.on( 'uploadSuccess', function( file, response ) {
          // debugger;
          if(response){
            //上传成功后，将相关信息保存起来
            var returnData = {
              contextId: response.contextId,
              extension: response.extension,
              length: response.length,
              md5: response.md5,
              url: response.url,
              name: file.name
            };
            file.cystorageData = returnData;
            $( '#'+file.id ).find('.state').text('已上传');
            that.fileList = that.extractFileData(uploader.getFiles('complete'))//只提取complete状态的文件，删除的文件和失败的文件不提取
            that.fileChange()//通过该事件将文件列表返回给父级组件
          }
        });
        uploader.on( 'uploadError', function( file ) {
          $( '#'+file.id ).find('.state').text('上传出错');
        });
        uploader.on( 'uploadComplete', function( file ) {
          // var $li = $( '#'+file.id ), $percent = $li.find('.file-upload-process-inner');
          // $percent.css( 'width','100%' );
          var $li = $( '#'+file.id ), $percent = $li.find('.file-upload-process-inner');
          $percent.css( 'width','100%' );
          // $percent.remove();//移除进度条
          //更改样式
          $percent = $li.find('.file-upload-process-outer');
          $percent.html('');//.upload-file-type-wrap-no-process
          $percent.addClass('file-upload-process-outer--no-process ');//
          //
          var $fileName = $li.find('.upload-file-type-wrap');
          $fileName.addClass('upload-file-type-wrap-no-process');

        });

        this.uploader = uploader
        let oldTitile = $("title").html().split("#")[0];
        $("title").html(oldTitile);//兼容ie9，ie9下回在title中追加路由信息。
      },
      reset(){//先销毁，再创建
        this.cleanAllFile();//清除原有组件数据，包括页面的数据
        this.uploader.destroy();
        this.init();
        console.log('重新初始化web uploader成功')
      },
      cleanAllFile(){//重置uploader组件文件队列,清空页面文件信息
        this.uploader.reset();
        var $list = $('#fileList-'+this.id);
        var $preview = $('#preview-'+this.id);
        $list.empty();
        $preview.empty();
      },
      // 将文件列表传递到父组件
      fileChange(){
        console.log('webuploader file list',this.fileList)
        this.$emit('fileChange',this.fileList)
      },
      //从文件中提取必要信息
      extractFileData(files){
        var arr = [];
        for(var i=0; i < files.length; i++){
          arr.push(files[i].cystorageData);
        }
        return arr;
      },
      // 刷新
      _clickRefresh() {
        this.mouserover++
        if(this.mouserover==1) {
          this.uploader.refresh();
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>
<style>
  .upload-group .upload-place-wrap {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 2px;
    border: 1px solid #e4e7ed;
    overflow: hidden; }
  .upload-group .upload-place-wrap .upload-place-pic {
    width: 50px;
    height: 50px;
    margin: 16px auto 0;
    background: url("./images/upload-place-pic.png") no-repeat center center;
    border-radius: 2px;
    cursor: pointer; }
  .upload-group .upload-place-wrap > p {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #999; }
  .upload-group .upload-file-wrap {
    margin-top: 15px;
    height: 36px;
    line-height: 36px; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .upload-file-type-wrap {
    float: left;
    max-width: 140px;
    /*margin-left: -100%;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .upload-file-type-wrap .file-type-icon {
    font-size: 14px; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .upload-file-type-wrap .file-type-icon::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    vertical-align: -2px; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .upload-file-type-wrap .file-type-icon.file-type-icon-doc::before {
    background: url("./images/file-type-icon-doc.png") no-repeat center center; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-upload-process-wrap {
    float: left;
    width: 100%; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-upload-process-wrap .just-wrap {
    /*  height: 36px;
      line-height: 36px;*/
    padding: 0 20px 0 150px; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-upload-process-wrap .just-wrap .file-upload-process-outer {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 8px;
    background-color: #ccc;
    border-radius: 10px;
    overflow: hidden; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-upload-process-wrap .just-wrap .file-upload-process-outer .file-upload-process-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 60%;
    height: 100%;
    background-color: #007bff; }
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-item-delete {
    float: left;
    width: 14px;
    height: 14px;
    margin: 12px 0 0 -14px;
    background: url("./images/file-item-delete.png") no-repeat center center;
    font-style: normal;
    cursor: pointer; }
  .upload-group .upload-tips {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color: #7d8ba0; }
  .upload-group .tips-icon::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    vertical-align: -2px;
    background: url("./images/input-tips.png") no-repeat center center;
  }

  .webuploader-element-invisible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px,1px,1px,1px);
  }
  .webuploader-pick p {
    text-align: center;
  }
  .upload-group .upload-file-wrap {
    height: 2px;
  }


  /* 文字按钮样式 */
  .textBtn .upload-group .upload-place-wrap {
    display: inline-block;
    border: 1px solid #007bff;
    color: #007bff;
    height: 32px;
    line-height: 32px;
    width: auto;
    min-width: 90px;
    border-radius: 4px;
  }
  .textBtn .upload-group .upload-place-wrap:hover {
    background-color: #e6edf5;
  }
  .textBtn .upload-group .upload-place-wrap .upload-place-pic {
    display: none;
  }
  .upload-preview {
    display: inline-block;
  }
  .upload-preview img {
    border: 1px solid #e4e7ed;
    margin-right: 5px;
    border-radius: 2px;
  }
  /* /隐藏进度条样式*/
  .upload-group .upload-file-wrap .upload-file-item-wrap .file-upload-process-wrap .just-wrap .file-upload-process-outer.file-upload-process-outer--no-process {
    background-color: white;
    width: 0px;
  }
  .upload-group .upload-file-wrap .upload-file-item-wrap .upload-file-type-wrap.upload-file-type-wrap-no-process {
    max-width: 440px;
  }
  /* /隐藏进度条样式*/

  /* 隐藏上传按钮后样式微调*/
  .upload-group .upload-file-wrap.hiddenBtn {
    margin-top: -10px;
  }
  /* /隐藏上传按钮后样式微调*/

</style>
