import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}`

function recursiveCategories(params = {}) {
    return request({
      url: `${baseUrl}recursiveCategories`,
      params,
    })
  }
  function getCompanies(){
    return request({
      url: `${baseUrl}getcompanies`
    })
  }
  function getbrands(){
    return request({
      url: `${baseUrl}brands`
    })
  }
  function getrecursive(){
    return request({
      url: `${baseUrl}recursiveCategories`
    })
  }
  function  getshopData(id){
    return request({
      url: `${baseUrl}getshopData/${id}`,
      method: 'GET',
    })
  }
  function  getTopSelling(){
    return request({
      url: `${baseUrl}products/getTopSelling`,
      method: 'GET',
    })
  }
  function  getAuctionProducts(user_id){
    return request({
      url: `${baseUrl}products/auctioned?user_id=${user_id}`,
      method: 'GET',
    })
  }
  function removeDuplicates(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique.push(arr[i]);
        }
    }
    return unique;
}
  const HomeService = {
    recursiveCategories,
    getshopData,
    removeDuplicates,
    getCompanies,
    getbrands,
    getrecursive,
    getTopSelling,
    getAuctionProducts
  }
  
  export default HomeService