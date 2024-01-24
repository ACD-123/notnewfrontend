import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}trustedseller`

function save(data) {
  return request({
    url: `${baseUrl}/create`,
    data,
    method: 'POST',
  })
}

function get(user) {
  return request({
    url: `${baseUrl}/${user?.id}`,
    method: 'GET',
  })
}

function show(data) {
  return request({
    url: `${baseUrl}/show/${data.id}`,
    data,
    method: 'GET',
  })
}
function update(data, id) {
  return request({
    url: `${baseUrl}/update/${id}`,
    data,
    method: 'PUT',
  })
}
function uploadFiles(id, data) {
  return request({
    url: `${baseUrl}/file-upload/${id}`,
    data,
    method: 'POST',
  })
}
function getUploadFile() {
  return request({
    url: `${baseUrl}/getUploadFile`,
    method: 'GET',
  })
}
const TrustedSellerService = {
  save,
  show,
  update,
  get,
  uploadFiles,
  getUploadFile,
}

export default TrustedSellerService
