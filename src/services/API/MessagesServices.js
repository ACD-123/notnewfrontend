import request from '../request'
import { BASE_API } from './../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}message`

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
    url: `${baseUrl}/conversations/${productId}`,
    params,
  })
}

function getUserConversations(params = {}) {
  return request({
    url: `${baseUrl}/conversations`,
    params,
  })
}

function saveAssociated(data) {
  return request({
    url: `${baseUrl}/saveAssociated`,
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
  saveAssociated,
  getUserConversations
}

export default MessagesServices
