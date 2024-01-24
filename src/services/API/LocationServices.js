import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}location`

function getCityStatebyPostal(zipCode) {
  return request({
    url: `${baseUrl}/getCityStatebyPostal/${zipCode}`,
    method: 'POST',
  })
}

const PriceServices = {
  getCityStatebyPostal,
}

export default PriceServices
