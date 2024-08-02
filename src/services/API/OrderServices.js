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
function tracking(data) {
  return request({
    url: baseUrl + '/tracking/' + data,
    data,
    method: 'GET',
  })
}
function packed(data) {
  return request({
    url: baseUrl + '/packed/' + data,
    data,
    method: 'PATCH',
  })
}
function rateCalculator(data) {
  return request({
    url: baseUrl + '/ratecalculator/',
    data,
    method: 'POST',
  })
}
function validatePostalCode(data) {
  return request({
    url: baseUrl + '/validatePostalCode/',
    data,
    method: 'POST',
  })
}
function validateAddress(data) {
  return request({
    url: baseUrl + '/validateAddress/',
    data,
    method: 'POST',
  })
}
function updateOrderStatus(data) {
  return request({
    url: ordersApi + '/updateOrderStatus',
    data,
    method: 'POST',
  })
}
function getTrsutedUserData(id) {
  return request({
    url: baseUrl + '/getTrsutedUserData/' + id,
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
function orderRefund(formData) {
  return request({
    url: `${baseApi}refund/add`,
    method: 'POST',
    data: formData,
  });
}
function customerOderReview(data) {
  return request({
    url: `${baseApi}feedback/add`,
    method: 'POST',
    data: data,
  });
}

function customerReOrder(data) {
  return request({
    url: `${baseApi}cart/reorderweb`,
    method: 'POST',
    data: { data: data },
  });
}

function removeProductFromSearchList(data) {
  return request({
    url: `${baseApi}searchHistory/deleteSearchProduct`,
    method: 'POST',
    data: data ,
  });
}

function postHelpAndSupport(data) {
  return request({
    url: `${baseApi}additional_pages/store`,
    method: 'POST',
    data: data,
  });
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
    url: `${ordersApi}/seller/dashboard`,
    params,
    method: 'GET',
  })
}
function getDashboardData() {
  return request({
    url: `${baseApi}seller/getsellerorder`,
    method: 'GET',
  })
}
function getbyid(id) {
  return request({
    url: `${baseUrl}/getById_/${id}`,
    method: 'GET',
  })
}
function getOrderDetailsbyid(id) {
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
function sellerOngoingOrders() {
  return request({
    url: `${ordersApi}/active`,
    method: 'GET',
  })
}

function customerPendingOrders() {
  return request({
    url: `${ordersApi}/activecustomer`,
    method: 'GET',
  })
}

function customerActiveOrders() {
  return request({
    url: `${ordersApi}/accepted_customer`,
    method: 'GET',
  })
}

function getMyBidsAndOffers(user_id) {
  return request({
    url: `${baseApi}bidding/userbids?user_id=${user_id}`,
    method: 'GET',
  })
}

function getRecentlySearchedItems(user_id) {
  return request({
    url: `${baseApi}searchHistory/getProducts?user_id=${user_id}`,
    method: 'GET',
  })
}

function customerSellerShops(user_id) {
  return request({
    url: `${baseApi}favourites/get?type=2&user_id=${user_id}`,
    method: 'GET',
  })
}
function customerActiveFavProducts(user_id) {
  return request({
    url: `${baseApi}favourites/get?type=1&user_id=${user_id}`,
    method: 'GET',
  })
}

function sellerActiveOrders() {
  return request({
    url: `${ordersApi}/accepted`,
    method: 'GET',
  })
}

function getPendingOdersDetail(oder_id , status , order_status) {
  return request({
    url: `${baseApi}order/getById/${oder_id}?status=${status}&order_status=${order_status}`,
    method: 'GET',
  })
}

function getRefundedOdersDetail(oder_id , status) {
  return request({
    url: `${baseApi}order/getById/${oder_id}?status=${status}&refunded=1`,
    method: 'GET',
  })
}

function getRefundOdersDetail(oder_id) {
  return request({
    url: `${baseApi}order/getById_/${oder_id}`,
    method: 'GET',
  })
}
function customerOngoingOrders() {
  return request({
    url: `${ordersApi}/active`,
    method: 'GET',
  })
}
// function customerOngoingOrders() {
//   return request({
//     url: `${ordersApi}/active`,
//     method: 'GET',
//   })
// }
function customerCompletedOrders() {
  return request({
    url: `${ordersApi}/completedcustomer`,
    method: 'GET',
  })
}
function sellerCompletedOrders() {
  return request({
    url: `${ordersApi}/completed`,
    method: 'GET',
  })
}
function customerCompleteOrders() {
  return request({
    url: `${ordersApi}/completedcustomer`,
    method: 'GET',
  })
}
function sellerRejectedOrders() {
  return request({
    url: `${ordersApi}/rejected`,
    method: 'GET',
  })
}
function customerRefundOrders() {
  return request({
    url: `${ordersApi}/refundcustomer`,
    method: 'GET',
  })
}
function sellerRefundOrders() {
  return request({
    url: `${ordersApi}/refund`,
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
  sellerRefundOrders,
  sellerCompletedOrders,
  sellerOngoingOrders,
  customerOngoingOrders,
  customerCompletedOrders,
  customerRefundOrders,
  orderRefund,
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
  updateOrderStatus,
  validatePostalCode,
  validateAddress,
  getTrsutedUserData,
  vendorDelivered,
  vendorNotDelivered,
  getOrderDetailsbyid,
  updateSeller,
  getDashboardData,
  getPendingOdersDetail,
  sellerActiveOrders,
  sellerRejectedOrders,
  customerPendingOrders,
  customerCompleteOrders,
  customerOderReview,
  customerReOrder,
  customerSellerShops,
  customerActiveFavProducts,
  postHelpAndSupport,
  getMyBidsAndOffers,
  getRecentlySearchedItems,
  removeProductFromSearchList,
  getRefundOdersDetail,
  getRefundedOdersDetail,
  customerActiveOrders
}

export default OrderServices
