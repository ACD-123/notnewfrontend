import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function getFeatured(params = {}) {
  return request({
    url: `${baseUrl}seller/getfeatured`,
    params,
    method: 'GET',
  })
}

function save(data) {
    return request({
      url: `${baseUrl}seller/add`,
      data,
      method: 'POST',
    })
  }
  
function detail(params = {}) {
  return request({
    url: `${baseUrl}seller/detail`,
    params,
  })
}

function detailById(id, params = {}) {
  return request({
    url: `${baseUrl}seller/detail/${id}`,
    params,
  })
}

function upload(data) {
  return request({
    url: `${baseUrl}seller/upload`,
    data,
    method: 'POST',
  })
}

function update(data) {
  return request({
    url: `${baseUrl}seller/update`,
    data,
    method: 'POST',
  })
}

function updateVideo(data) {
  return request({
    url: `${baseUrl}seller/updateVideo`,
    data,
    method: 'POST',
  })
}

function deleteAccount(id){
  return request({
    url: `${baseUrl}seller/deleteAccount/${id}`,
    method: 'POST',
  })
}

function cancelDelete(id){
  return request({
    url: `${baseUrl}seller/cancelDelete/${id}`,
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
      url: `${baseUrl}seller/setbank`,
      data,
      method: 'POST',
    })
  }

  function getShopHeader(guid) {
    return request({
      url: `${baseUrl}seller/getShopDetailHeader/${guid}`,
      method: 'GET',
    })
  }
  function getShopDetailProducts(guid , search) {
    return request({
      url: `${baseUrl}seller/getShopDetailProducts/${guid}?search_key=${search}`,
      method: 'GET',
    })
  }
  function getShopDetailAbout(guid) {
    return request({
      url: `${baseUrl}seller/getShopDetailAbout/${guid}`,
      method: 'GET',
    })
  }

  function getFaqs(type) {
    return request({
      url: `${baseUrl}additional_pages/get?type=${type}`,
      method: 'GET',
    })
  }
  
  function getStore(data) {
    return request({
      url: `${baseUrl}seller/getshops/${data}`,
      data,
      method: 'GET',
    })
  }
  function saveSeller(data) {
    return request({
      url: `${baseUrl}seller/saveSeller`,
      data,
      method: 'POST',
    })
  }
  function updateBank(data) {
    return request({
      url: `${baseUrl}seller/updateBank`,
      data,
      method: 'POST',
    })
  }
  function getBankDetails(params = {}) {
    return request({
      url: `${baseUrl}seller/getBankDetails`,
      params
    })
  }
  function getUserSaveSeller(params = {}) {
    return request({
      url: `${baseUrl}seller/getusersaveseller`,
      params
    })
  }

  function getFeedBack(id) {
    return request({
      url: `${baseUrl}seller/feedback/${id}`,
      method: 'GET'
    })
  }
  function getShopDetailFeedback(id) {
    return request({
      url: `${baseUrl}seller/getShopDetailFeedback/${id}`,
      method: 'GET'
    })
  }
  function getTopSellers(id) {
    return request({
      url: `${baseUrl}products/getTopSellers?user_id=${id}`,
      method: 'GET'
    })
  }

  function createSellerReport(data) {
    return request({
      url: `${baseUrl}seller/report`,
      data,
      method: 'POST',
    })
  }

  function createSellerWithdraw(seller_guid , data) {
    return request({
      url: `${baseUrl}seller/witdraw/${seller_guid}`,
      data,
      method: 'POST',
    })
  }

  function changePassword(data) {
    return request({
      url: `${baseUrl}user/updatePassword`,
      data,
      method: 'POST',
    })
  }

  function createRecent(data) {
    return request({
      url: `${baseUrl}seller/createRecents`,
      data,
      method: 'POST',
    })
  }

  function updateNotificationSetting(data) {
    return request({
      url: `${baseUrl}user/updateNotificationSetting`,
      data,
      method: 'POST',
    })
  }

  function getShopDetails(id) {
    return request({
      url: `${baseUrl}seller/getshopdetails/${id}`,
      method: 'GET',
    })
  }
  function getShopDetail() {
    return request({
      url: `${baseUrl}seller/getshopdetails`,
      method: 'GET',
    })
  }

  function getNotificationSetting() {
    return request({
      url: `${baseUrl}user/getNotificationSetting`,
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
  getTopSellers,
  getShopDetail,
  createSellerReport,
  createSellerWithdraw,
  changePassword,
  updateVideo,
  getNotificationSetting,
  updateNotificationSetting,
  getFaqs
}

export default SellerServices
