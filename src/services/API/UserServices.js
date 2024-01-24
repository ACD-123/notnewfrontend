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

// function depositfund(){
//   return request({
//     url: baseUrl + 'depositfund'
//   })
// }

const UserService = {
  all,
  detail,
  upload,
  messages,
  conversations,
  sendMessage,
  update,
  refreshOnboadingUrl,
  detailById,
  checkAccount,
  deleteAccount,
  cancelDelete,
  fcmToken,
  // depositfund,
}

export default UserService
