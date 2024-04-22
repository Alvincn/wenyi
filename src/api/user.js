import request from '../utils/request'

/**
 * 根据用户名搜索用户
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getFindUserByUserName = (params) => {
  return request.get('/user/findUserByUserName', {
    params
  })
}
/**
 * 注册用户
 * @param user
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postRegister = (user) => {
  return request.post('/user/register',user )
}
export const postLogin = (user) => {
  return request.post('/user/login', user)
}