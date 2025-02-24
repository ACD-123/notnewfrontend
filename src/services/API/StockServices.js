import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}stock`

function save(data) {
  return request({
    url: baseUrl + `/add`,
    data,
    method: 'POST',
  })
}
function stockOut(){
  return request({
    url: baseUrl + `/outstock`,
    method: 'GET',
  })
}
function stockIn(){
  return request({
    url: baseUrl + `/instock`,
    method: 'GET',
  })
}
const StockServices = {
    stockIn,
    stockOut,
    save
}

export default StockServices
