import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}transaction`

function usertransaction() {
  return request({
    url: baseUrl + `/usertransaction`,
    method: 'GET',
  })
}
function gettransactions(){
  return request({
    url: baseUrl + `/gettransactions`,
    method: 'GET',
  })
}
const TransactionServices = {
    usertransaction,
    gettransactions,
}

export default TransactionServices
