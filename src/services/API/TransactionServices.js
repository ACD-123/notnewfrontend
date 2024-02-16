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

const TransactionServices = {
    usertransaction,
}

export default TransactionServices
