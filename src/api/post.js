import request from "../utils/request";
import {getCurrentTime} from "../utils/utils";

/**
 * 发布帖子
 */
export const postSendPosts = (data) => {
  let draftData = {
    postStatus: 2,
    senderTime: getCurrentTime(),
  }
  data = {
    ...data,
    ...draftData
  };
  return request.post('/posts/savePostDraft', data)
}
/**
 * 保存草稿
 */
export const postSavePostsDraft = (data) => {
  // 草稿为0
  let draftData = {
    postStatus: 0,
    topic: '[]',
    senderTime: getCurrentTime(),
  }
  data = {
    ...data,
    ...draftData
  };
  return request.post('/posts/savePostDraft', data)
}

/**
 * 获取草稿
 */
export const getPostDraft = () => {
  return request.get('/posts/getPostDraft')
}

/**
 * 删除草稿
 */
export const deletePostDraft = () => {
  return request.delete('/posts/deleteDraft')
}

/**
 * 获取所有的数据
 */
export const getAllPosts = () => {
  return request.get('/posts/allPosts')
}

/**
 * 获取我所有的帖子
 */
export const  getUserAllPosts = () => {
  return request.get('/posts/getUserPosts')
}

export const getPersonAllPosts = (userId) => {
  return request.get('/posts/getPersonPosts', {
    params: {
      userId
    }
  })
}

/**
 * 根据帖子id获取帖子
 */
export const getPostById = (postId) => {
  return request.get('/posts/getPostById', {
    params: {
      postId: postId
    }
  })
}

/**
 * 关键词搜索帖子
 */
export const getPostByKeyword = (keyword) => {
  return request.get('/posts/getPostByKeyword', {
    params: {
      keyword
    }
  })
}

/**
 * 获取精选帖子
 */
export const getGoodsPosts = () => {
  return request.get('/posts/getGoodPost')
}