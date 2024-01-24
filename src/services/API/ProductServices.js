import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}products`
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

function get(id, params = {}) {
  return request({
    url: `${baseUrl}/show/${id}`,
    params,
  })
}

function destroy(id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'DELETE',
  })
}

function updateRatings(id, data) {
  return request({
    url: `${baseUrl}/ratings/${id}`,
    data,
    method: 'PATCH',
  })
}

function userRating(id) {
  return request({
    url: `${baseUrl}/userRating/${id}`,
    method: 'GET',
  })
}
function checkRating(productId, userId, orderId) {
  return request({
    url: `${baseUrl}/checkRatings/${productId}/${userId}/${orderId}`,
    method: 'GET',
  })
}

function uploadImages(productId, data) {
  return request({
    url: `${baseUrl}/image-upload/${productId}`,
    data,
    method: 'POST',
  })
}

function city(data) {
  return request({
    url: `${BASE_API}city?value=${data}`,
    method: 'GET',
  })
}
function state() {
  return request({
    url: `${BASE_API}state`,
    method: 'GET',
  })
}
function images(serviceId) {
  return request({
    url: `${baseUrl}/media/${serviceId}`,
    method: 'GET',
  })
}

function removeImage(mediaId) {
  return request({
    url: `${baseUrl}/media/${mediaId}`,
    method: 'DELETE',
  })
}

function self(params = {}) {
  return request({
    url: `${baseUrl}/self`,
    params,
  })
}

function search(params = {}) {
  return request({
    url: `${baseUrl}/search`,
    params: this.$route.query,
  })
}

function saved(productId, data) {
  return request({
    url: `${baseUrl}/saved-users/${productId}`,
    data,
    method: 'POST',
  })
}

function offer(id, data) {
  return request({
    url: `${baseUrl}/${id}/offer`,
    data,
    method: 'POST',
  })
}

// function getSaved(params = {}) {
function getSaved(params = {}) {
  return request({
    url: `${baseUrl}/saved`,
    params,
  })
}
function getSaveByUser(params = {}) {
  return request({
    url: `${baseUrl}/getSaveByUser`,
    params,
  })
}

function buyingOffer(params = {}) {
  return request({
    url: `${baseUrl}/offers/buying`,
    params,
  })
}

function sellingOffer(params = {}) {
  return request({
    url: `${baseUrl}/offers/selling`,
    params,
  })
}

function feature(id, data) {
  return request({
    url: `${baseUrl}/${id}/feature`,
    data,
    method: 'POST',
  })
}

function hire(id, data) {
  return request({
    url: `${baseUrl}/${id}/hire`,
    data,
    method: 'POST',
  })
}

function getAttributes(categoryID) {
  return request({
    url: `${baseUrl}/getAttributes/${categoryID}`,
    method: 'GET',
  })
}
function getProductAttributes(productId) {
  return request({
    url: `${baseUrl}/getProductAttributes/${productId}`,
    method: 'GET',
  })
}

function checkEmailReview(id) {
  return request({
    url: `${baseUrl}/checkEmailReview/${id}`,
    method: 'POST',
  })
}

function checkUserProductOffer(id, guid) {
  return request({
    url: `${baseUrl}/checkUserProductOffer/${id}/${guid}`,
    method: 'GET',
  })
}

function getSavedAddress(guId) {
  console.log('guId',guId)
  return request({
    url: `${baseUrl}/getSavedAddress/${guId}`,
    method: 'GET',
  })
}

function flexefee() {
  return request({
    url: `${baseUrl}/flexefee`,
    method: 'GET',
  })
}

function recent(params = {}) {
  return request({
    url: `${baseUrl}/recent`,
    params,
  })
}
const ProductServices = {
  all,
  save,
  update,
  get,
  state,
  destroy,
  uploadImages,
  images,
  userRating,
  checkRating,
  removeImage,
  self,
  search,
  saved,
  getSaved,
  offer,
  buyingOffer,
  sellingOffer,
  feature,
  hire,
  updateRatings,
  city,
  getAttributes,
  getProductAttributes,
  getSaveByUser,
  checkEmailReview,
  checkUserProductOffer,
  flexefee,
  getSavedAddress,
  recent
}

export default ProductServices
