import axios from 'axios'

const client = axios.create()
const request = function (options) {
  const onSuccess = function (response) {
    return response.data
  }

  const onError = function (err) {
    if (err.response) {
    } else {
    }

    return Promise.reject(err)
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'content-type': 'multipart/form-data',
    },
  }

  return client({ ...options, ...headers })
    .then(onSuccess)
    .catch(onError)
}

export default request
