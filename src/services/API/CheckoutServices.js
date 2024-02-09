
import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}checkout`
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

function save(data) {
  return request({
    url: `${baseUrl}/add`,
    data,
    method: 'POST',
  })
}

function remove(id) {
  return request({
    url: `${baseUrl}/destroy/${id}`,
    method: 'DELETE',
  })
}

const CheckoutServices = {
  all,
  self,
  save,
  remove
}

export default CheckoutServices
