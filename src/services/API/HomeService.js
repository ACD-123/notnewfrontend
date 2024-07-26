import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}`

function recursiveCategories(params = {}) {
  return request({
    url: `${baseUrl}recursiveCategories`,
    params,
  })
}
function getCompanies() {
  return request({
    url: `${baseUrl}getcompanies`
  })
}

function getbrands() {
  return request({
    url: `${baseUrl}brands`
  })
}

function getHigherProductPrice() {
  return request({
    url: `${baseUrl}products/maxPriceProduct`
  })
}

function getrecursive() {
  return request({
    url: `${baseUrl}recursiveCategories`
  })
}

function getSearchProducts(search) {
  return request({
    url: `${baseUrl}searchHistory/get?search_key=${search}`
  })
}

function getFilterProducts(user_id, category, brand, condition, attribute, min_price, max_price , page_size , page , usedCondition , underage) {
  let attributes = [];
  for (let i = 0; i < attribute?.length; i++) {
    // for (let j = 0; j < attribute[i].selectToSend.length; j++) {
      attributes.push({ key: attribute[i].name, value: attribute[i].selectToSend })
    // }
  }
  return request({
    url: `${baseUrl}products/filterProducts?user_id=${user_id}
    &category=${category ? category : null}
    &brand=${brand ? brand : null}
    &condition=${condition ? condition : null }
    &attributes=${attribute.length > 0 ? JSON.stringify(attributes) : "[]"}
    &min_price=${min_price}
    &max_price=${max_price}
    &page_size=${page_size}
    &page=${page}
    &used_condition=${usedCondition}
    &underage=${underage}
    `
  })
}

function getshopData(id) {
  return request({
    url: `${baseUrl}getshopData/${id}`,
    method: 'GET',
  })
}
function getTopSelling(user_id) {
  return request({
    url: `${baseUrl}products/getTopSelling?user_id=${user_id}`,
    method: 'GET',
  })
}
function getAuctionProducts(user_id) {
  return request({
    url: `${baseUrl}products/auctioned?user_id=${user_id}`,
    method: 'GET',
  })
}
function removeDuplicates(arr) {
  let unique = [];
  for (let i = 0; i < arr.length; i++) {
    if (unique.indexOf(arr[i]) === -1) {
      unique.push(arr[i]);
    }
  }
  return unique;
}
const HomeService = {
  recursiveCategories,
  getshopData,
  removeDuplicates,
  getCompanies,
  getbrands,
  getrecursive,
  getTopSelling,
  getAuctionProducts,
  getSearchProducts,
  getFilterProducts,
  getHigherProductPrice
}

export default HomeService