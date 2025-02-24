import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}prices`
function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}
function getbyId(id){
  return request({
    url: baseUrl+ `/getbyId/${id}`,
    method: 'GET',
  })
}
const PriceServices = {
  all,
  getbyId,
}

export default PriceServices
