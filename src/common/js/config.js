import $ from "jquery"; //用jquery ajax来同步请求数据
const base = "backend";
const _ = url => base.concat(url);
// const mockBase = "";
const mockBase = "/mock"; //mock前缀

export const rootUrl = {
  loginURL: _("/casClient/index"),
  checkAuth: _(mockBase + "/setting/checkAuth"),
  getConfig: _("/setting/getConfig"),
  getHomePath: _("/login/firstLink"),
  getToken: _("/upload/tokenize.do"),
  // 根据角色判断前端访问地址是否授权
  isAuthUrl: _(mockBase + "/shiro/checkInitUrlUrl"),
  getClassInfoDemo: _(mockBase + "/classspace/getClassInfo"),
};

//cystorage文件服务配置信息
// export const CystorageInfo = {
//   appName: 'ledc_rrt',// * AppName，必需
//   server: 'http://cystorage.ledc.changyan.cn',    // * 文件服务地址，必需
//   tokenUrl: rootUrl.getToken,//获取cystorage的token请求地址
//   debug: true, // 关闭或打开日志开关，不写默认为打开
// }
//获取文件服务信息
export function CystorageInfo() {
  const info = {
    appName: "", // * AppName，必需
    server: "", // * 文件服务地址，必需
    tokenUrl: rootUrl.getToken, //获取cystorage的token请求地址
    debug: true, // 关闭或打开日志开关，不写默认为打开
    baseUrl: "",
  };
  let href = window.location.href;
  href = href.split("#")[0];
  href = href.endsWith("/") ? href.substring(0, href.length - 1) : href;
  info.baseUrl = href;
  let failFlag = true;
  for (let i = 0; i < 3 && failFlag; i++) {
    $.ajax({
      url: rootUrl.getCystorageInfo,
      type: "POST", //GET
      async: false, //!!!!必须是false，来实现同步请求
      data: {},
      timeout: 5000, //超时时间
      dataType: "json", //返回的数据格式：
      beforeSend: function(xhr) {},
      success: function(res, textStatus, jqXHR) {
        if (res.code == ReturnCode.success) {
          info.appName = res.data.appName;
          info.server = "http://" + res.data.server.replace("http://", "");
          // info.baseUrl = res.data.baseUrl;
          failFlag = false;
        } else {
          //console.log("文件服务信息获取失败", res);
        }
      },
      error: function(xhr, textStatus) {},
      complete: function() {},
    });
  }
  return info;
}

//返回代码
export const ReturnCode = {
  success: "1",
};
