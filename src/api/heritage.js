// noinspection JSClosureCompilerSyntax

import axios from "axios";
import request from "../utils/request";

/**
 * 获取非遗数据
 */
export const getHeritagesData = ({province, type, page}) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl =
      `https://www.ihchina.cn/getProject.html?province=${province}&rx_time=&type=${type}&cate=1&keywords=&category_id=16&limit=10&p=${page}`
    let result = await axios.get(baseUrl)
    resolve({
      pageInfo: {
        total: result.data.links.total,
        total_page: result.data.links.total_pages,
        current: result.data.links.current
      },
      list: result.data.list
    })
  })
}

/**
 * 获取非遗详情
 * @param heritageId
 */
export const getHeritageDetail = (heritageId) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl =
      `https://www.ihchina.cn/project_details/${heritageId}/`
    let result = await axios.get(baseUrl)
    resolve(result.data)
  })
}
/**
 * 获取百度中关于关键词的数据
 */
export const getBaiduDetail = (text) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl = `https://baike.baidu.com/item/${text}`
    let result = await axios.get(baseUrl)
    resolve(result.data)
  })
}
/**
 * 从必应图片获取图片
 */
export const getBiYingImg = (text) => {
  return new Promise(async (resolve, reject) => {
    const baseUrl = `https://cn.bing.com/images/vsasync?q=${text}`
    let result = await axios.get(baseUrl)
    resolve(result.data?.results)
  })
}

/**
 * 以下为自写接口
 */
/**
 * 收藏该非遗
 * @param data {
 *   heritageId 非遗id
 *   heritageName 非遗名称
 *   heritageLocation 非遗申办地址
 *   heritageContent 非遗描述
 * }
  */
export const addCollectionHeritage = (data) => {
  return request.post('/heritage/addHeritageCollection', data)
}
/**
 * 取消收藏该非遗
 * @param data {
 *   heritage_id 非遗id
 *   heritage_name 非遗名称
 *   heritage_location 非遗申办地址
 *   heritage_content 非遗描述
 * }
 */
export const removeCollectionHeritage = (data) => {
  return request.post('/heritage/removeHeritageCollection', data)
}
/**
 * 获取用户所有的收藏非遗
 */
export const getMyCollectionHeritage = (userId) => {
  return request.get("/heritage/getMyCollectionHeritage", {
    params: {
      userId
    }
  })
}
/**
 * 判断用户是否收藏了该非遗
 *@param params {
 *   heritageId 非遗id
 * }
 */
export const isCollectionHeritage = (params) => {
  return request.get("/heritage/isCollectionHeritage", {
    params
  })
}