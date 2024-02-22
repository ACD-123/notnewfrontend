import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}notificationsettings/`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function notificationSettings() {
  return request({
    url: `${baseUrl}recentuserview`,
    method: "GET"
  })
}

function notificationSaveSettings(data) {
    return request({
      url: `${baseUrl}add`,
      data,
      method: "POST"
    })
  }

  function show() {
    return request({
      url: `${baseUrl}show`,
      method: "GET"
    })
  }
  
const NotificationSettingsServices = {
  all,
  notificationSaveSettings,
  notificationSettings,
  show,
}

export default NotificationSettingsServices
