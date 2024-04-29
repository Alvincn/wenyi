import request from "../utils/request";

/**
 * 获取帖子下所有评论
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getComments = (postId) => {
  return request.get("/comment/getComment", {
    params: {
      postId
    }
  })
}
/**
 * 添加评论
 */
export const saveComment = (data) => {
  return request.post('/comment/addComment', data)
}