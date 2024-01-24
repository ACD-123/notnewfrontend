import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}state`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function get(id) {
  return request({
    url: `${baseUrl}/country/${id}`,
  })
}

const State = {
  all,
  get,
}

export default State
