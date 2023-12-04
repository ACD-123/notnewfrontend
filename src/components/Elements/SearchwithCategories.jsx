import React from 'react'
import Searchicon from "../../assets/Images/Elements/search.png"

var Searchbg = {
    backgroundImage: `url(${Searchicon})`,
    backgroundSize: "100% 100%"
  };


const SearchwithCategories = () => {
  return (
    <>
    <form id="searchForm">
    <div class="input-group se">
    <input type="submit" value="Search" 
    style={Searchbg}
    />
  </div>
  <div class="input-group">
    <input type="text" id="search" name="search" placeholder='Search Here Anything.....' />
  </div>
  <div class="input-group categoruu">
    <select id="category" name="category">
      <option value="all">Categories</option>
      <option value="books">Books</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
 
    </select>
  </div>
  
</form>
    </>
  )
}

export default SearchwithCategories