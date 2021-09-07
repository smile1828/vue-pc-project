import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  timeout: 60000 * 10 // request timeout
})

// 添加请求拦截器，在请求头中加token
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 添加响应拦截器，对返回结果做统一处理
service.interceptors.response.use(function (response) {
  const status = response.data.success
  if (status === undefined) { // 下载接口返回文件流
    return response
  } else if (status) {
    return response.data.data
  } else {
    const errorCode = response.data.errorCode
    const messages = response.data.message
    // token过期
    if (errorCode === 401) {
      Message.warning('您的登录状态已过期，请重新登录')
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      router.push({ path: '/login' })
      return Promise.reject(response.data)
    }
    if (messages) {
      Message.error(messages)
      return Promise.reject(response.data)
    } else {
      Message.error('操作失败')
      return Promise.reject(response.data)
    }
  }
}, function (error) {
  // Do something with response error
  Message.error('服务器异常')
  return Promise.reject(error)
})

export default service
