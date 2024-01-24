import { isEmpty } from '../Utilities'

export const getAccessToken = () => localStorage.getItem('access_token')

export const setAccessToken = (token) =>
  localStorage.setItem('access_token', token)

export const getRefreshToken = () => localStorage.getItem('refresh_token')

export const setRefreshToken = (token) =>
  localStorage.setItem('refresh_token', token)

export const setUserDetails = (details) =>
  localStorage.setItem('user_details', JSON.stringify(details))

export const setfcmToken = (fcm_token) =>
    localStorage.setItem('fcm_token', JSON.stringify(fcm_token))
  
export const getUserDetails = () =>
  JSON.parse(localStorage.getItem('user_details'))

export const isLoggedin = () => {
  return localStorage.getItem('access_token');
  // if (localStorage.getItem('access_token')) {
  //   return !isEmpty(getUserDetails())
  // }
  // return false
}
