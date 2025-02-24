import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}cart`
const baseApi = `${BASE_API}`

function self(params = {}) {
  return request({
    url: `${baseUrl}/self`,
    params,
  })
}

function selfGuest(guest_user_id) {
  return request({
    url: `${BASE_API}guest-cart/self?user_id=${guest_user_id}`,
  })
}

function save(data) {
  return request({
    url: `${baseUrl}/add`,
    data,
    method: 'POST',
  })
}

function saveGuest(data) {
  return request({
    url: `${baseApi}guest-cart/add`,
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

function removeGuest(data) {
  return request({
    url: `${baseApi}guest-cart/destroy`,
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

function clearAllCartGuest(guest_user_id) {
  return request({
    url: `${baseApi}guest-cart/clear?user_id=${guest_user_id}`,
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

function updateCartGuest(data , id) {
  return request({
    url: `${baseApi}guest-cart/update/${id}`,
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
  saveGuest,
  remove,
  removeGuest,
  count,
  updateCart,
  updateCartGuest,
  clearAllCart,
  clearAllCartGuest,
  selfGuest
}

export default CartServices
