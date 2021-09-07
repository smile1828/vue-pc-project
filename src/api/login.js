import { getService, postService } from './service'
/**
 * name 登录
 * time 2021-09-07
 * param userName String 账号
 * param password String 密码
 * return String token
 * */
export const signIn = params => {
  return postService('/anon/login', params)
}
/**
 * name 登出
 * time 2021-09-07
 * */
export const signOut = params => {
  return getService('/auth/logout', params)
}
