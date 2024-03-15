import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}user/`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function detail(params = {}) {
  return request({
    url: `${baseUrl}detail`,
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

function conversations() {
  return request({
    url: `${baseUrl}conversations`,
  })
}

function messages(id, params = {}) {
  return request({
    url: `${baseUrl}${id}/messages`,
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
    method: 'PATCH',
  })
}

function changePassword(data){
  console.log('ss', `${baseUrl}change-password`)
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
function getSellerActiveBid(){
  return request({
    url: `${baseUrl}getselleractivebid`,
    method: "GET"
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
  deleteRecentUser,
  detail,
  upload,
  messages,
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
  getBid
  // depositfund,
}

export default UserService
