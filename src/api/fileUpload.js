import request from "../utils/request";
import axios from "axios";
const baseUrl = 'http://ivikey.top:3110/upload'
export const postFileUpload = (formData) => {
  return axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}