import service from './index'

export const baseService = function (url, data = {}, method = 'GET', header = {}, responseType = 'json') {
  // 校验 URL 必需
  if (!url) {
    console.log('请传入 request 地址')
    return
  }
  // 请求方式转为大写
  method = method.toLocaleUpperCase()

  const config = {
    url: url,
    method: method,
    headers: header,
    responseType: responseType // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  }
  if (method === 'GET' || method === 'DELETE') {
    config.params = data
  }
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    config.data = data
  }
  return service(config)
    .then(response => {
      return response
    }).catch(err => {
      return Promise.reject(err)
    })
}

export const getService = function (url, data, header, responseType) {
  return baseService(url, data, 'GET', header, responseType)
}
export const deleteService = function (url, data, header, responseType) {
  return baseService(url, data, 'DELETE', header, responseType)
}
export const postService = function (url, data, header, responseType) {
  return baseService(url, data, 'POST', header, responseType)
}
export const putService = function (url, data, header, responseType) {
  return baseService(url, data, 'PUT', header, responseType)
}
