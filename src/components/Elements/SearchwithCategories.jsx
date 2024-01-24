import React, { useEffect, useState } from 'react'
import Searchicon from "../../assets/Images/Elements/search.png"
import Category from "../../services/API/Category"; //~/services/API/Category
var Searchbg = {
    backgroundImage: `url(${Searchicon})`,
    backgroundSize: "100% 100%"
  };

const SearchwithCategories = () => {
  const [categories, setCategory] = useState({});
  const getCategory = () => {
    Category.all()
    .then((response) => {
      setCategory(response)
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
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
      {categories.length > 0 ? (
        <>
          {categories?.map(category => {
            return (
              <option key={category.id} value={category.id}>
                <a href={category.guid}><b>{category.name}</b></a>
                {category.children_recursive.length > 0 ?(
                  <>
                  <ul className="dropdown-menu shadow">
                    {category.children_recursive.map(child => {
                      return(
                        <>
                        <li key={child.id}><a href={child.guid}><b>{child.name}</b></a></li>
                        </>
                      )
                    })}
                    </ul>
                  </>
                ):('')}
                
              </option>
            )
          } )}
        </>
      ) :('')}
    </select>
  </div>
  
</form>
    </>
  )
}

export default SearchwithCategories