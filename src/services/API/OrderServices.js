import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}order`

function index(id) {
  return request({
    url: baseUrl + `/${id}`,
    method: 'GET',
  })
}
function getUserData() {
  return request({
    url: `${baseUrl}`,
    method: 'GET',
  })
}
function save(data) {
  return request({
    url: baseUrl,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  
  return request({
    url: baseUrl + `/${id}`,
    data,
    method: 'PATCH',
  })
}
function refund(data) {
  return request({
    url: baseUrl,
    data,
    method: 'PATCH',
  })
}
function tracking(data){
  return request({
    url: baseUrl+'/tracking/'+ data,
    data,
    method: 'GET',
  })
}
function packed(data){
  return request({
    url: baseUrl+'/packed/'+ data,
    data,
    method: 'PATCH',
  })
}
function rateCalculator(data){
  return request({
    url: baseUrl+'/ratecalculator/',
    data,
    method: 'POST',
  })
}
function validatePostalCode(data){
  return request({
    url: baseUrl+'/validatePostalCode/',
    data,
    method: 'POST',
  })
}
function validateAddress(data){
  return request({
    url: baseUrl+'/validateAddress/',
    data,
    method: 'POST',
  })
}
function getTrsutedUserData(id){
  return request({
    url: baseUrl+'/getTrsutedUserData/'+ id,
    method: 'GET',
  })
}
function vendorDelivered(id, data) {
  return request({
    url: baseUrl + `/delivered/${id}`,
    data,
    method: 'POST',
  })
}
function vendorNotDelivered(id, data) {
  return request({
    url: baseUrl + `/notdelivered/${id}`,
    data,
    method: 'POST',
  })
}

const OrderServices = {
  save,
  refund,
  update,
  index,
  getUserData,
  tracking,
  packed,
  rateCalculator,
  validatePostalCode,
  validateAddress,
  getTrsutedUserData,
  vendorDelivered,
  vendorNotDelivered,
}

export default OrderServices
