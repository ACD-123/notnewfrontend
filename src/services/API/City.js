import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}city`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function get(id) {
  return request({
    url: `${baseUrl}/states/${id}`,
  })
}

const City = {
  all,
  get,
}

export default City
