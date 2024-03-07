import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}bids`
function all(params = {}) {
  return request({
    url: `${baseUrl}/`,
    params,
  })
}

function getMaxBids(id) {
  return request({
    url: `${baseUrl}/getMax/${id}`,
    method: 'GET',
  })
}

function getProductBids(id) {
    return request({
      url: `${baseUrl}/gettotalbidsproduct/${id}`,
      method: 'GET',
    })
}
function save(data) {
  return request({
      url: `${baseUrl}/add`,
      data,
      method: 'POST',
  })
}
function confirmBids(data) {
  return request({
      url: `${baseUrl}/confirmedBids`,
      data,
      method: 'POST',
  })
}
const BidsServices = {
  all,
  getMaxBids,
  getProductBids,
  save,
  confirmBids,
}

export default BidsServices
