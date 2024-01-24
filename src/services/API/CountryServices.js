import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}countries/`
function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}
const CountryServices = {
  all,
}

export default CountryServices
