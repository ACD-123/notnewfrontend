import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}products`
function all(params = {}) {
  return request({
    url: `${baseUrl}/`,
    params,
  })
}

function save(data) {
  return request({
    url: `${baseUrl}/add`,
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
    url: `${baseUrl}/destory/${id}`,
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
    url: `${baseUrl}/self/`,
    params,
  })
}

function selfValue(value) {
  return request({
    url: `${baseUrl}/self/${value}`
  })
}

// function search(params = {}) {
  function search(data) {
  return request({
    url: `${baseUrl}/search`,
    data, //this.$route.query,
    method: 'POST',
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

function getProductByPrice(val) {
  return request({
    url: `${baseUrl}/getbyprice/${val}`,
    method: 'GET',
  })
}

function getSavedAddress(guId) {
  return request({
    url: `${baseUrl}/getSavedAddress/${guId}`,
    method: 'GET',
  })
}
function getByPriceRange(min,max){
  return request({
    url: `${baseUrl}/getbypricerange/${min}/${max}`,
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
function createRecent(data) {
  return request({
    url: `${baseUrl}/createRecent`,
    data,
    method: 'POST',
  })
}
function Imgupload(data){
  return request({
    url: `${baseUrl}/upload`,
    data,
    method: 'POST',
  })
}
function storeProduct(data) {
  return request({
    url: `${baseUrl}/storeproduct/${data}`,
    method: 'GET',
  })
}

function min() {
  return request({
    url: `${baseUrl}/min`,
    method: 'GET',
  })
}

function max() {
  return request({
    url: `${baseUrl}/max`,
    method: 'GET',
  })
}

function getSizes() {
  return request({
    url: `${baseUrl}/size`,
    method: 'GET',
  })
}

function getbycategory(id){
  return request({
    url: `${baseUrl}/getbycategory/${id}`,
    method: 'GET',
  })
}

function getCategories(id){
  return request({
    url: `${baseUrl}/categories`,
    method: 'GET',
  })
}

function getProductbySize(size){
  return request({
    url: `${baseUrl}/getproductbysize/${size}`,
    method: 'GET',
  })
}
const ProductServices = {
  all,
  getProductByPrice,
  getProductbySize,
  getCategories,
  getbycategory,
  getByPriceRange,
  save,
  min,
  max,
  update,
  get,
  state,
  destroy,
  Imgupload,
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
  getSizes,
  getSavedAddress,
  recent,
  selfValue,
  createRecent,
  storeProduct,
}

export default ProductServices
