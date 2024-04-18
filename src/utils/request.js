import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseHTTPURL} from "../config/config";
const request = axios.create({
  baseURL: baseHTTPURL,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(async config => {
  if (await AsyncStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + await AsyncStorage.getItem('token')
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
})
export default request;