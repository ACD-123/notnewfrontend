import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}stock`

function stockIn() {
  return request({
    url: baseUrl + `/instock`,
    method: 'GET',
  })
}
function stockOut(){
  return request({
    url: baseUrl + `/outstock`,
    method: 'GET',
  })
}

const StockServices = {
    stockIn,
    stockOut
}

export default StockServices
