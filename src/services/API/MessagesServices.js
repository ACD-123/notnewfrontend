import request from '../request'
import { BASE_API } from './../Constant'
const baseUrl = `${BASE_API}message`;
const baseUrlChat = `${BASE_API}`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
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
    url: `${baseUrl}/${id}`,
    data,
    method: 'PATCH',
  })
}

function destroy(id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'DELETE',
  })
}

function get(recipientId, productId, params = {}) {
  return request({
    url: `${baseUrl}/${recipientId}/${productId}`,
    params,
  })
}

function conversations(productId, params = {}) {
  return request({
    url: `${baseUrl}/conversations/`,
    params,
  })
}

function getUserConversations(params = {}) {
  return request({
    url: `${baseUrl}/conversations`,
    params,
  })
}

function getChatUsers(user_id , status) {
  return request({
    url: `${baseUrlChat}chat/getChatUsers/${user_id}/${status}`,
  })
}

function sendChatMessage(data) {
  return request({
    url: `${baseUrlChat}chat/sendMessage`,
    data,
    method: 'POST',
  })
}

function createChatRooms(data) {
  return request({
    url: `${baseUrlChat}chat/createChatRooms`,
    data,
    method: 'POST',
  })
}

const MessagesServices = {
  get,
  conversations,
  all,
  save,
  update,
  destroy,
  sendChatMessage,
  getUserConversations,
  getChatUsers,
  createChatRooms
}

export default MessagesServices
