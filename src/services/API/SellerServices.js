import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}seller/`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function getFeatured(params = {}) {
  return request({
    url: `${baseUrl}getfeatured`,
    params,
    method: 'GET',
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
    url: `${baseUrl}update`,
    data,
    method: 'POST',
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

  function getShopDetails(data) {
    console.log('data', data)
    return request({
      url: `${baseUrl}getshopdetails/${data}`,
      method: 'GET',
    })
  }
  function getStore(data) {
    return request({
      url: `${baseUrl}getshops/${data}`,
      data,
      method: 'GET',
    })
  }
  function saveSeller(data) {
    return request({
      url: `${baseUrl}saveSeller`,
      data,
      method: 'POST',
    })
  }
  function updateBank(data) {
    return request({
      url: `${baseUrl}updateBank`,
      data,
      method: 'POST',
    })
  }
  function getBankDetails(params = {}) {
    return request({
      url: `${baseUrl}getBankDetails`,
      params
    })
  }

const SellerServices = {
  all,
  getFeatured,
  detail,
  upload,
  update,
  detailById,
  deleteAccount,
  cancelDelete,
  save,
  getBanks,
  setBank,
  getShopDetails,
  getStore,
  saveSeller,
  updateBank,
  getBankDetails
}

export default SellerServices
