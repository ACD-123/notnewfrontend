import request from '../request'
import { BASE_API } from './../Constant'

const baseUrl = `${BASE_API}notifications`

function getNotifications() {
  return request({
    url: `${baseUrl}/get`,
    method: 'get',
  })
}

function getCount() {
  return request({
    url: `${baseUrl}/count`,
    method: 'get',
  })
}

function update(id, data) {
  return request({
    url: `${baseUrl}/update/${id}`,
    data,
    method: 'PATCH',
  })
}

const NotificationServices = {
  getNotifications,
  getCount,
  update,
}

export default NotificationServices
