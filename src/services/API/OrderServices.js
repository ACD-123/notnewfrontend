import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}order`
const baseApi = `${BASE_API}`
const ordersApi = `${BASE_API}orders`

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
function ordersummary(params = {}) {
  return request({
    url: `${baseApi}ordersummary/`,
    params,
    method: 'GET',
  })
}
function getSingleOrderSummary(id) {
  return request({
    url: `${baseApi}ordersummary/${id}`,
    method: 'GET',
  })
}
function getusercompletedcount(params = {}) {
  return request({
    url: `${baseUrl}/counts`,
    params,
    method: 'GET',
  })
}
function getuserbidscount(params = {}) {
  return request({
    url: `${baseUrl}/offers/counts`,
    params,
    method: 'GET',
  })
}
function getbyid(id) {
  return request({
    url: `${baseUrl}/getById/${id}`,
    method: 'GET',
  })
}
function updateSeller(id, data) {
  return request({
    url: `${baseUrl}/updateSeller/${id}`,
    data,
    method: 'PATCH',
  })
}
function customerCompCount() {
  return request({
    url: `${baseUrl}/customer/comp/count`,
    method: 'GET',
  })
}
function customerPendCount() {
  return request({
    url: `${baseUrl}/customer/pend/count`,
    method: 'GET',
  })
}
function customerRefundCount() {
  return request({
    url: `${baseUrl}/customer/refund/count`,
    method: 'GET',
  })
}
function customerOngoingOrders() {
  return request({
    url: `${baseUrl}/customer/ongoing`,
    method: 'GET',
  })
}
function customerCompletedOrders() {
  return request({
    url: `${baseUrl}/customer/completed`,
    method: 'GET',
  })
}
function customerRefundOrders() {
  return request({
    url: `${baseUrl}/customer/refund`,
    method: 'GET',
  })
}
function customerBuyAgainOrders() {
  return request({
    url: `${baseUrl}/customer/buyagainorders`,
    method: 'GET',
  })
}
const OrderServices = {
  save,
  customerOngoingOrders,
  customerCompletedOrders,
  customerRefundOrders,
  customerBuyAgainOrders,
  getbyid,
  getuserbidscount,
  customerCompCount,
  customerPendCount,
  customerRefundCount,
  ordersummary,
  getSingleOrderSummary,
  getusercompletedcount,
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
  updateSeller
}

export default OrderServices
