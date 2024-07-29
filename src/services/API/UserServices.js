import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}user/`
const baseUrlChat = `${BASE_API}`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function detail(params = {}) {
  return request({
    url: `${baseUrl}detail/`,
    params,
  })
}

function detailById(id, params = {}) {
  return request({
    url: `${baseUrl}detail/${id}`,
    params,
  })
}
function self(params = {}) {
  return request({
    url: `${baseUrl}self`,
    params,
    method: "GET"
  })
}

function upload(data) {
  return request({
    url: `${baseUrl}upload`,
    data,
    method: 'POST',
  })
}

function conversations(user_id) {
  return request({
    url: `${baseUrlChat}chat/getChatListBUid?id=${user_id}`,
  })
}

function getMessagesById(id, params = {}) {
  return request({
    url: `${baseUrlChat}chat/getById?room_id=${id}`,
    params,
  })
}

function sendMessage(id, data) {
  return request({
    url: `${baseUrl}${id}/send-message`,
    data,
    method: 'POST',
  })
}

function update(data) {
  return request({
    url: `${baseUrl}`,
    data,
    method: 'PATCH',
  })
}

function updateProfile(data) {
  return request({
    url: `${baseUrl}profileupdate`,
    data,
    method: 'POST',
  })
}

function refreshOnboadingUrl(id) {
  return request({
    url: `${baseUrl}refresh/${id}`,
  })
}

function checkAccount(account){
  return request({
    url: `${baseUrl}checkAccount/${account}`,
  })
}

function deleteAccount(id){
  return request({
    url: `${baseUrl}deleteAccount/${id}`,
    method: 'POST',
  })
}

function cancelDelete(id){
  return request({
    url: `${baseUrl}cancelDelete/${id}`,
    method: 'POST',
  })
}

function fcmToken(token){
  return request({
    url: `${baseUrl}fcm-token/${token}`,
    method: 'PATCH',
  })
}

function secretQuestion(data){
  return request({
    url: `${baseUrl}secretquestion/`,
    data,
    method: 'POST',
  })
}

function changePassword(data){
  return request({
    url: `${baseUrl}change-password`,
    data,
    method: 'POST',
  })
}

function twoSteps(data){
  return request({
    url: `${baseUrl}two-steps`,
    data,
    method: 'POST',
  })
}

function thirdParty(data){
  return request({
    url: `${baseUrl}third-party`,
    data,
    method: 'POST',
  })
}

function fbAccount(data){
  return request({
    url: `${baseUrl}fb-account`,
    data,
    method: 'POST',
  })
}
// function depositfund(){
//   return request({
//     url: baseUrl + 'depositfund'
//   })
// }
function updateAddress(data) {
  return request({
    url: `${baseUrl}updateaddress`,
    data,
    method: "POST"
  })
}

function recentUserView() {
  return request({
    url: `${baseUrl}recentuserview`,
    method: "GET"
  })
}

function getBid(id){
  return request({
    url: `${baseUrl}getbid/${id}`,
    method: "GET"
  })
}
function getUserBid(){
  return request({
    url: `${baseUrl}getuserbid`,
    method: "GET"
  })
}
function deleteRecentUser() {
  return request({
    url: `${baseUrl}deleteRecent`,
    method: "DELETE"
  })
}
function getSellerActiveBid(user_id){
  return request({
    url: `${baseUrlChat}bidding/getactiveinactive?user_id=${user_id}`,
    method: "GET"
  })
}
function acceptSellerActiveBid(data){
  return request({
    url: `${baseUrlChat}bidding/award`,
    method: "POST",
    data
  })
}
function getSellerActiveDetails(productid , guid){
  return request({
    url: `${baseUrlChat}bidding/get?product_id=${productid}&guid=${guid}`,
    method: "GET"
  })
}
function couponsDiscount(id, date){
  return request({
    url: `${BASE_API}coupons/get?user_id=${id}&user_date=${date}`,
    method: "GET"
  })
}
function getCouponsById(id){
  return request({
    url: `${BASE_API}coupons/get/${id}`,
    method: "GET"
  })
}
function getSavedSeller(id) {
  return request({
    url: `${BASE_API}favourites/get?type=2&user_id=${id}`,
    method: 'GET'
  })
}
function addCoupons(data){
  return request({
    url: `${BASE_API}coupons/save`,
    data,
    method: "POST"
  })
}

function placeABid(data){
  return request({
    url: `${baseUrlChat}bidding/save`,
    data,
    method: "POST"
  })
}

function updateCoupon(data){
  return request({
    url: `${BASE_API}coupons/update`,
    data,
    method: "POST"
  })
}
function deleteCoupons(data){
  return request({
    url: `${BASE_API}coupons/delete`,
    data,
    method: "POST"
  })
}
function resendOtp(data) {
  return request({
    url: `${baseUrl}resendOtp`,
    data,
    method: "POST"
  })
}
function resendForgetOtp(data) {
  return request({
    url: `${baseUrl}resendForgetOtp`,
    data,
    method: "POST"
  })
}
const UserService = {
  all,
  getUserBid,
  resendOtp,
  resendForgetOtp,
  getSellerActiveBid,
  couponsDiscount,
  deleteRecentUser,
  detail,
  upload,
  getMessagesById,
  secretQuestion,
  conversations,
  sendMessage,
  update,
  refreshOnboadingUrl,
  detailById,
  checkAccount,
  deleteAccount,
  cancelDelete,
  fcmToken,
  updateProfile,
  self,
  changePassword,
  twoSteps,
  thirdParty,
  fbAccount,
  recentUserView,
  updateAddress,
  getBid,
  addCoupons,
  getSavedSeller,
  deleteCoupons,
  getCouponsById,
  updateCoupon,
  getSellerActiveDetails,
  acceptSellerActiveBid,
  placeABid
  // depositfund,
}

export default UserService
