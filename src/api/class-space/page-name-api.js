import { httpPost, httpGet, httpPostJson } from "@/common/js/util";
import { rootUrl } from "@/common/js/config";
const MaxRetryTimes = 3; //请求失败重试次数

// export function getBatchAPIList(params) {
//   let getBatchAPIList = rootUrl.getBatchAPIList;
//   return httpPost(getBatchAPIList, params, MaxRetryTimes);
// }
