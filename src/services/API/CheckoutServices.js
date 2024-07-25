
import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}checkout`
const baseApi = `${BASE_API}`
function all(params = {}) {
  return request({
    url: `${baseUrl}/`,
    params,
  })
}

function self(params = {}) {
  return request({
    url: `${baseUrl}/self_`,
    params,
  })
}

function getBuyItNowData() {
  return request({
    url: `${baseUrl}/buynow_`,
    method: 'GET'
  })
}

function getCheckoutData() {
  return request({
    url: `${baseUrl}/self_`,
    method: 'GET'
  })
}

function getShippingData(to_country , topostalcode , weight ,deliverycompany) {
  return request({
    url: `${baseApi}testshipengine?to_country=${to_country}&to_postal_code=${topostalcode}&weight=${weight}&delivery_company=${deliverycompany}`,
    method: 'GET'
  })
}

function checkoutButItNow(data) {
  return request({
    url: `${baseApi}order`,
    method: 'POST',
    data: data
  })
}

function checkout(data) {
  return request({
    url: `${baseApi}order`,
    method: 'POST',
    data: data
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
  remove,
  getBuyItNowData,
  getShippingData,
  checkoutButItNow,
  getCheckoutData,
  checkout
}

export default CheckoutServices
