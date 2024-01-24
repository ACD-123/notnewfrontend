import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}seller/`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function save(data) {
    return request({
      url: `${baseUrl}add`,
      data,
      method: 'POST',
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

function update(data) {
  return request({
    url: `${baseUrl}`,
    data,
    method: 'PATCH',
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

function getBanks(params = {}) {
    return request({
      url: `${BASE_API}bank/get`,
      params,
    })
}

function setBank(data) {
    return request({
      url: `${baseUrl}setbank`,
      data,
      method: 'POST',
    })
  }
const SellerServices = {
  all,
  detail,
  upload,
  update,
  detailById,
  deleteAccount,
  cancelDelete,
  save,
  getBanks,
  setBank
}

export default SellerServices
