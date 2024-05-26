
import request from "../utils/request";
// 发布反馈
export const postSendFeedback = (data) => {
  return request.post('/feedback/saveFeedback', data)
}
// 根据id获取该反馈
export const getFeedback = (id) => {
  return request.get('/feedback/getFeedback', {
    params: {
      id
    }
  })
}
// 获取所有的反馈
export const getFeedbackList = () => {
  return request.get('/feedback/getAllFeedbackList')
}
// 获取我所有的反馈
export const getMyFeedback = () => {
  return request.get('/feedback/getMyFeedbackList')
}