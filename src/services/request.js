import axios from 'axios'

const client = axios.create()
// client.setHeader('Authorization', '123');
const request = function (options) {
  const onSuccess = function (response) {
    return response.data
  }

  const onError = function (err) {
    if (err.response) {
      // Request was made but server responded with something other than 2xx
    } else {
      // Something else happened while setting up the request triggered the error
    }

    // return Promise.reject(err.response || err.message);
    return Promise.reject(err)
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }

  return client({ ...options, ...headers })
    .then(onSuccess)
    .catch(onError)
}

export default request
