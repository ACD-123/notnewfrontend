import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}shipping`
function all(params = {}) {
  return request({
    url: `${baseUrl}/`,
    params,
  })
}

function self(params = {}) {
    return request({
      url: `${baseUrl}/self`,
      params,
    })
}

function remove(id) {
  return request({
    url: `${baseUrl}/destroy/${id}`,
    method: 'DELETE',
  })
}

function count() {
  return request({
    url: `${baseUrl}/count`,
    method: 'GET',
  })
}
const ShippingServices = {
  all,
  self,
  remove,
  count
}

export default ShippingServices
