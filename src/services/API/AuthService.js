import request from '../request'
import { BASE_URL, BASE_API } from '../Constant'

const baseUrl = `${BASE_URL}`
const baseApi = `${BASE_API}`

function register(data) {

  return request({
    url: `${baseApi}auth/register`,
    data,
    method: 'POST',
  })
}

function login(data) {
  return request({
    url: `${baseApi}auth/login`,
    data,
    method: 'POST',
  })
}
function onsuccessFullLogin(token,data) {
  return request({
    url: `${baseApi}auth/onsuccessFullLogin/${token}`,
    data,
    method: 'POST',
  })
}

// function loginWithSocial(token)
// {
//   return request({
//   url: `${baseApi}login?token=${token}`,
//   method:'POST'
//   });
// }

function logout(data = {}) {
  return request({
    url: `${baseApi}auth/logout`,
    data,
    method: 'POST',
  })
}

function forgetPassword(data) {
  return request({
    url: `${baseApi}forgot-password`,
    data,
    method: 'POST',
  })
}

function verifyAuthOtp(data) {
  return request({
    url: `${baseApi}verify/Auth/otp`,
    data,
    method: 'POST',
  })
}

function verifyOtp(data) {
  return request({
    url: `${baseApi}verify/otp`,
    data,
    method: 'POST',
  })
}
function resetPassword(data) {
  return request({
    url: `${baseApi}password/reset`,
    data,
    method: 'POST',
  })
}

function facebookLogin(data) {
  return request({
    url: `${baseApi}auth/facebook-login`,
    data,
    method: 'POST',
  })
}

function googleLogin(data) {
  return request({
    url: `${baseApi}auth/google-login`,
    data,
    method: 'POST',
  })
}

function verify(userId, hash, data) {
  return request({
    url: `${baseApi}auth/verify/${userId}/${hash}`,
    data,
    method: 'POST',
  })
}

const AuthService = {
  register,
  login,
  logout,
  forgetPassword,
  resetPassword,
  facebookLogin,
  googleLogin,
  verify,
  verifyOtp,
  verifyAuthOtp,
  onsuccessFullLogin,
}

export default AuthService
