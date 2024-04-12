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
      url: `${baseUrl}brands/`
    })
  }
  function getrecursive(){
    return request({
      url: `${baseUrl}recursiveCategories`
    })
  }
  const Home = {
    recursiveCategories,
    getCompanies,
    getbrands,
    getrecursive
  }
  
  export default Home