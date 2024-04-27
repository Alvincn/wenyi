import request from "../utils/request";

/**
 * 喜欢
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postAddLikes = (data) => {
  return request.post('/likes/addLikes', data)
}

/**
 * 删除收藏
 */
export const deleteRemoveLikes = (data) => {
  return request.delete('/likes/deleteLikes', {
    data
  })
}

/**
 * 获取所有的收藏
 */
export const getGetLikes = (userId) => {
  return request.get("/likes/getLikes", {
    params: {
      userId
    }
  })
}

/**
 * 用户是否收藏了这个帖子
 */
export const getUserLikesPost = (params) => {
  return request.get("/likes/userLikePost", {
    params
  })
}