import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}refund`

function save(data) {
  return request({
    url: baseUrl,
    data,
    method: 'POST',
  })
}
function update(id, data, status) {
  return request({
    url: baseUrl + `/${id}/${status}`,
    data,
    method: 'PATCH',
  })
}
const RefundService = {
  save,
  update,
}

export default RefundService
