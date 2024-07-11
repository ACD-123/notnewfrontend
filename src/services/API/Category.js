import request from '../request'
import { BASE_API } from '../Constant'

const baseUrlC = `${BASE_API}categories`
const baseUrl = `${BASE_API}`

function all(params = {}) {
  return request({
    url: baseUrlC,
    params,
  })
}

function overAll(params = {}) {
  return request({
    url: `${baseUrlC}/overAll`,
    params,
  })
}
function getCategoryProductsById(category_id) {
  return request({
    url: `${baseUrl}products/category-wise-product/${category_id}`,
    method: 'GET'
  })
}
function getCategorySubCategoryById(category_id) {
  return request({
    url: `${baseUrl}categories/sub-categories/${category_id}`,
      method: 'GET'
  })
}
function save(data) {
  return request({
    url: baseUrlC,
    data,
    method: 'POST',
  })
}

function productAttributes(categoryId, params = {}) {
  return request({
    url: `${baseUrl}products/getCategoryAttributes/${categoryId}`,
    params,
  })
}

function tabs(params = {}) {
  return request({
    url: `${baseUrlC}/tabs/list`,
    params,
  })
}

function get(id) {
  return request({
    url: `${baseUrlC}/${id}`,
  })
}

const Category = {
  all,
  save,
  productAttributes,
  tabs,
  get,
  overAll,
  getCategoryProductsById,
  getCategorySubCategoryById
}

export default Category
