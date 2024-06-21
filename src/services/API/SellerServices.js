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

  function getShopHeader(guid) {
    return request({
      url: `${baseUrl}getShopDetailHeader/${guid}`, // Modify the endpoint to include the GUID
      method: 'GET',
    })
  }
  function getShopDetailProducts(guid) {
    return request({
      url: `${baseUrl}getShopDetailProducts/${guid}`, // Modify the endpoint to include the GUID
      method: 'GET',
    })
  }
  function getShopDetailAbout(guid) {
    return request({
      url: `${baseUrl}getShopDetailAbout/${guid}`, // Modify the endpoint to include the GUID
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
  function getUserSaveSeller(params = {}) {
    return request({
      url: `${baseUrl}getusersaveseller`,
      params
    })
  }

  function getFeedBack(id) {
    return request({
      url: `${baseUrl}feedback/${id}`,
      method: 'GET'
    })
  }
  function getShopDetailFeedback(id) {
    return request({
      url: `${baseUrl}getShopDetailFeedback/${id}`,
      method: 'GET'
    })
  }
  function createRecent(data) {
    return request({
      url: `${baseUrl}createRecents`,
      data,
      method: 'POST',
    })
  }
  function getShopDetails(id) {
    return request({
      url: `${baseUrl}getshopdetails/${id}`,
      method: 'GET',
    })
  }

const SellerServices = {
  all,
  getFeatured,
  getFeedBack,
  detail,
  getUserSaveSeller,
  upload,
  update,
  detailById,
  deleteAccount,
  cancelDelete,
  save,
  getBanks,
  setBank,
  getShopHeader,
  getShopDetailProducts,
  getShopDetailFeedback,
  getShopDetailAbout,
  getStore,
  getShopDetails,
  saveSeller,
  updateBank,
  getBankDetails,
  createRecent,
}

export default SellerServices
