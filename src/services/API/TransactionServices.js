import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrlTransaction = `${BASE_API}transaction`
const baseUrl = `${BASE_API}`

function usertransaction() {
  return request({
    url: baseUrlTransaction + `/usertransaction`,
    method: 'GET',
  })
}
function gettransactions(seller_guid){
  return request({
    url: baseUrl + `seller/sellertransaction/${seller_guid}`,
    method: 'GET',
  })
}
function getStripeTransactions(){
  return request({
    url: baseUrlTransaction + `/getstripetransactions`,
    method: 'GET',
  })
}
const TransactionServices = {
    usertransaction,
    gettransactions,
    getStripeTransactions,
}

export default TransactionServices
