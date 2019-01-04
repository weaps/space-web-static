import axios from "axios";
import Qs from "qs";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.timeout = 60 * 1000;

export function httpGet(url, data = {}, retryTimes = 0) {
  //增加失败自动重新请求功能，默认不自动请求，需要手动添加retryTimes来限制重试次数
  return axios
    .get(url, { params: data })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(res => {
      if (retryTimes > 0) {
        console.log("请求出错重试", res);
        retryTimes--;
        return httpGet(url, data, retryTimes);
      } else {
        return Promise.reject(res);
      }
    });
}
export function httpPost(url, data, retryTimes = 0) {
  //增加失败自动重新请求功能，默认不自动请求，需要手动添加retryTimes来限制重试次数
  return axios
    .post(url, Qs.stringify(data))
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(res => {
      if (retryTimes > 0) {
        console.log("请求出错重试", res);
        retryTimes--;
        return httpPost(url, data, retryTimes);
      } else {
        return Promise.reject(res);
      }
    });
}
//json格式发送数据
export function httpPostJson(url, data, retryTimes = 0) {
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(res => {
      if (retryTimes > 0) {
        console.log("请求出错重试", res);
        retryTimes--;
        return httpPostJson(url, data, retryTimes);
      } else {
        return Promise.reject(res);
      }
    });
}
