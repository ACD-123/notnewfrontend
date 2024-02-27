import React from 'react'
import Searchicon from "../../../assets/Images/FilterAttributes/searchicons.png"

var Searchbg = {
    backgroundImage: `url(${Searchicon})`,
    backgroundSize: "100% 100%"
  };

const Search = (props) => {
  const handleSearch = (e) =>{
    e.preventDefault();
    props.parentCallback(e.target.value);
  }
  return (
    <>
    <form id="searchForm">
    <div class="input-group se">
    <input type="submit" value="Search" 
    style={Searchbg}
    />
  </div>
  <div class="input-group">
    <input type="text" onChange={handleSearch} id="search" name="search" placeholder='Search All 2,656 items' />
  </div>
</form>
    </>
  )
}

export default Search