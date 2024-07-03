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
}

export default Category
