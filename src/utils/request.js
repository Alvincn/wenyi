import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseHTTPURL} from "../config/config";
const request = axios.create({
  baseURL: baseHTTPURL,
  timeout: 50000
})
// 请求拦截器
request.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('wenyiToken')
  if (token) {
    config.headers['Authorization'] = await AsyncStorage.getItem('wenyiToken')
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
})
export default request;