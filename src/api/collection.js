import request from "../utils/request";

/**
 * 添加收藏
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postAddCollection = (data) => {
  return request.post('/collection/addCollection', data)
}

/**
 * 删除收藏
 */
export const deleteRemoveCollection = (data) => {
  return request.delete('/collection/deleteCollection', {
    data
  })
}

/**
 * 获取所有的收藏
 */
export const getGetCollections = (userId) => {
  return request.get("/collection/getCollections", {
    params: {
      userId
    }
  })
}

/**
 * 用户是否收藏了这个帖子
 */
export const getUserSavePost = (params) => {
  return request.get("/collection/userSavePost", {
    params
  })
}