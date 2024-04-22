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
 * @param provinceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getAllCitiesByProvince = (provinceId) =>{
  return request.get('/area/getCities', {
    params: {
      provinceId
    }
  })
}
/**
 * 根据市获取所有的县
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param provinceId
 * @param cityId
 */
export const getAllAreaByCity = (provinceId, cityId) =>{
  return request.get('/area/getAreas', {
    params: {
      provinceId,
      cityId
    }
  })
}/**
 * 根据市获取所有的乡
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param provinceId
 * @param cityId
 */
export const getAllTowns = (provinceId, cityId) =>{
    return request.get('/area/getTowns', {
      params: {
        provinceId,
        cityId
      }
    })
  }