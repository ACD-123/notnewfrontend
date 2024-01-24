import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}stripe`

function generatePaymentIntent(guid,totalPrice) {
  return request({
    url: baseUrl + `/generate/${guid}/${totalPrice}`,
  })
}

function generateFeatureIntent(params = {}) {
  return request({
    url: baseUrl + '/feature',
    params,
  })
}

function generateHireIntent(params = {}) {
  return request({
    url: baseUrl + '/hire',
    params,
  })
}

function getPaymentbyCustomer(params = {}) {
  return request({
    url: baseUrl + '/balance',
    params,
  })
}
function Transactions(){
  return request({
    url: baseUrl + '/Transactions'
  })
}

function PaymentsStatus(){
  return request({
    url: baseUrl + '/paymentsStatus'
  })
}

function updateUserAccount(params = {}){
  return request({
    url: baseUrl + '/updateUserAccount',
    params,
  })
}
function addUserAccforPostAdd(params = {}, id){
  return request({
    url: baseUrl + `/addUserAccforPostAdd/${id}`,
    params,
  })
}

function getBankAccounts(params = {}){
  return request({
    url: baseUrl + '/getBankAccounts',
    params,
  })
}
function PaymentIntents(id){
  return request({
    url: baseUrl + `/PaymentIntents/${id}`
  })
}
function getTax(data){
  return request({
    url: `${baseUrl}/getTax`,
    data,
    method: 'POST',
  })
}

const StripeService = {
  generatePaymentIntent,
  generateFeatureIntent,
  generateHireIntent,
  getPaymentbyCustomer,
  Transactions,
  PaymentsStatus,
  updateUserAccount,
  addUserAccforPostAdd,
  getBankAccounts,
  PaymentIntents,
  getTax,
}

export default StripeService
