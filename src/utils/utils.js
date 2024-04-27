import * as ImagePicker from "expo-image-picker";
import {postFileUpload} from "../api/fileUpload";
import {getAllAreaByCity, getAllCitiesByProvince, getALlProvince, getAllTowns} from "../api/province";

export const getCurrentTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minuts = date.getMinutes();
  return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero((minuts))}`
}
const addZero = (value) => {
  return value < 10? '0' + value: value;
}
/**
 * 给定日期计算与今天的距离
 * @param givenDate
 * @returns {number}
 */
export const daysSinceGivenDate = (givenDate) => {
  // 将给定日期字符串转换为日期对象
  const given = new Date(givenDate);

  // 获取今天的日期对象
  const today = new Date();

  // 计算两个日期之间的毫秒数差值
  const diffTime = Math.abs(today - given);

  // 将毫秒数差值转换为天数
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
/**
 * 根据生日计算年龄
 * @param birthday
 * @returns {number}
 */
export const calculateAge = (birthday) => {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
/**
 * 格式化时间
 */
export const formatDate = (date) => {
  let newDate = new Date(date)
  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let day = newDate.getDate()
  return `${addZero(year)}-${addZero(month)}-${addZero(day)}`
}

/**
 * 选取图片
 */
export const picketImage = async (options) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 0.5,
    ...options
  })
  if (result.canceled) {
    return ''
  }
  return result
}

/**
 * 文件上传
 */
export const fileUpload = (file) => {
  let uri = file.uri
  let uriArr = uri.split('/')
  let name = uriArr[uriArr.length - 1]
  let formData = new FormData();
  formData.append('file', {
    uri,
    name,
    type: file.mimeType
  })
  return new Promise((resolve, reject) => {
    postFileUpload(formData).then(res => {
      const result = res.data
      if(result.state === 200) {
        resolve(result.data.filePath)
      }else {
        reject(result.msg)
      }
    })
  })
}

/**
 * 请求省市
 */
export const requestProvince = (pId, index) => {
  return new Promise(async (resolve) => {
    // 根据选择的省份ID获取对应的城市列表
    switch (index) {
      case 0:
        let provinces = await getALlProvince();
        resolve({
          options: provinces.data.length === 0 ? [] : provinces.data.map((province, i) => ({
            value: province.id, // 使用数字索引作为值
            label: province.name,
          })),
          placeholder: `请选择省`,
        });
        break;
      case 1:
        let cities = await getAllCitiesByProvince(pId);
        resolve({
          options: cities.data.length === 0 ? [] : cities.data.map((city, i) => ({
            value: city.id, // 使用数字索引作为值
            label: city.name,
          })),
          placeholder: `请选择市`,
        });
        break;
      case 2:
        let areas = await getAllAreaByCity(pId);
        resolve({
          options: areas.data.length === 0 ? [] : areas.data.map((area, i) => {
            let id = area.id + 1
            return {
              value: id, // 使用数字索引作为值
              label:area.name,
            }
          }),
          placeholder: `请选择区县`,
        });
        break;
      case 3:
        let towns = await getAllTowns(pId);
        resolve({
          options: towns.data.length === 0 ? [] : towns.data.map((town, i) => ({
            value: ++town.id, // 使用数字索引作为值
            label: town.name,
          })),
          placeholder: `请选择镇`,
        });
        break;
      case 4:
        resolve({
          options: [],
          placeholder: `请选择哈哈`,

        });
        break;
    }
  });
}

/**
 * 防抖
 */
export const throttle = (func) => {
  let previous = 0;
  return function(){
    let now = Date.now(), context = this, args = [...arguments];
    if(now - previous > 400){
      func.apply(context, args);
      previous = now;
    }
  }
}