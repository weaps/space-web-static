import { httpGet, httpPost } from "@/common/js/util";
import { rootUrl } from "@/common/js/config";
// import axios from "axios";

const MaxRetryTimes = 3;
export function isAuthUrl(routeUrl) {
  return httpGet(rootUrl.isAuthUrl, { initUrl: routeUrl });
}

// function getInfo(url, parames) {
//   return axios
//     .get(url, {
//       headers: { "X-Requested-With": "XMLHttpRequest" },
//       params: parames,
//     })
//     .then(res => {
//       return Promise.resolve(res.data);
//     });
// }

// 判断是否已经登录及是否有权限
export function loggedIn() {
  const url = rootUrl.checkAuth;
  var initUrl = encodeURIComponent(window.location.href);
  return new Promise(resolve => {
    httpGet(url, { initUrl: initUrl }).then(res => {
      if (res.code === "1") {
        resolve("isOk");
      }
    });
  });
}

// 获取当前用户首页地址
export function getHomePage() {
  return httpPost(rootUrl.getHomePath, {}, MaxRetryTimes);
}
