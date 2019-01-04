import axios from 'axios'
import {rootUrl} from '@/common/js/config'

export function getUserInfo (account) {
  const url = rootUrl.getUserinfo
  // 根据视窗，动态计算一页显示的条数
  const data = Object.assign({}, {
    account
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getNews () {
  const url = rootUrl.getNews

  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopNewsFromModule () {
  const url = rootUrl.getTopNewsFromModule

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
