import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}cart`
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

function remove(data) {
  return request({
    url: `${baseUrl}/destroy`,
    data,
    method: 'POST',
  })
}

function clearAllCart() {
  return request({
    url: `${baseUrl}/clear`,
    method: 'POST',
  })
}

function updateCart(data , id) {
  return request({
    url: `${baseUrl}/update/${id}`,
    data,
    method: 'POST',
  })
}

function count() {
  return request({
    url: `${baseUrl}/count`,
    method: 'GET',
  })
}
const CartServices = {
  self,
  save,
  remove,
  count,
  updateCart,
  clearAllCart
}

export default CartServices
