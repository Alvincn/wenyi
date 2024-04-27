import request from "../utils/request";

export const getSearchSchool = (schoolName) => {
  return request.get('/school/searchSchool', {
    params: {
      schoolName
    }
  })
}