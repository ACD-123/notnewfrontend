import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}savelater`
function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}
function add(data){
  return request({
    url: baseUrl+ `/add`,
    data,
    method: 'POST'
  })
}
function getById(id){
    return request({
      url: baseUrl+ `/getById/${id}`,
      method: 'GET'
    })
  }
  function getByUser(){
    return request({
      url: baseUrl+ `/getByUser`,
      method: 'GET'
    })
  }
  
const SaveLaterServices = {
  all,
  add,
  getById,
  getByUser,
}

export default SaveLaterServices
