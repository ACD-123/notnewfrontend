import request from '../request'
import { BASE_API } from './../Constant'

const baseUrl = `${BASE_API}offer`

function index(id) {
  return request({
    url: baseUrl + `/${id}`,
    method: 'post',
  })
}
function status(id, data) {
  return request({
    url: `${baseUrl}/status/${id}`,
    data,
    method: 'post',
  })
}
function cancelOffer(id) {
  return request({
    url: `${baseUrl}/offerCancel/${id}`,
    method: 'POST',
  })
}
const OfferServices = {
  status,
  index,
  cancelOffer,
}

export default OfferServices
