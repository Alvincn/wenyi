import request from "../utils/request";

/**
 * 获取全部省
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getALlProvince = () => {
  return request.get('/area/getProvince')
}
/**
 * 通过省获取所有的市
 * @param pId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getAllCitiesByProvince = (pId) =>{
  return request.get('/area/getCities', {
    params: {
      pId
    }
  })
}
/**
 * 根据市获取所有的县
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param pId
 */
export const getAllAreaByCity = (pId) =>{
  return request.get('/area/getAreas', {
    params: {
      pId: pId
    }
  })
}/**
 * 根据市获取所有的乡
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param pId
 */
export const getAllTowns = (pId) =>{
    return request.get('/area/getTowns', {
      params: {
        pId
      }
    })
  }