import request from "../utils/request";

/**
 * 获取所有开启状态的话题
 */
export const getAllOpenTopics = () => {
  return request.get('/topic/getOpenTopic')
}