import request from "../utils/request";

/**
 * 获取所有开启状态的话题
 */
export const getAllOpenTopics = () => {
  return request.get('/topic/getOpenTopic')
}

/**
 * 根据热度获取话题
 */
export const getHeatTopics = () => {
  return request.get('/topic/getHeatTopic')
}

/**
 * 根据id获取到这个话题
 */
export const reqGetTopicById = (id) => {
  return request.get('/topic/getTopicDetail', {
    params: {
      id
    }
  })
}

/**
 * 根据话题id获取到这个话题下所有的帖子
 */
export const reqGetAllPostByTopicId = (id) => {
  return request.get("/topic/getPostsByTopicId", {
    params: {
      topicId: id
    }
  })
}