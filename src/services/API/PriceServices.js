import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
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
