import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}watchlist`
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
const WatchListServices = {
  all,
  save
}

export default WatchListServices
