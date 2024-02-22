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
function getStripeTransactions(){
  return request({
    url: baseUrl + `/getstripetransactions`,
    method: 'GET',
  })
}
const TransactionServices = {
    usertransaction,
    gettransactions,
    getStripeTransactions,
}

export default TransactionServices
