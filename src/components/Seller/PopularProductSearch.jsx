import React, {useState, useEffect} from 'react'
import { toast } from "react-toastify";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import Home from '../../services/API/Home'; //~/services/API/Home

// storeProduct
const PopularProductSearch = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  
  let categoryLists = [];
  const getPopular =()=>{
    try {
      ProductServices.storeCategories(props.shopId)
          .then((response) => {
            for (let i = 0; i < response.length; i++) {
                categoryLists.push({ val: i, text: response[i].category.name }); 
            }
            let categorylist =[];
            for(let j = 0; j < categoryLists.length; j++){
                categorylist.push(categoryLists[j].text)
            }
            let uniqueCategory  = Home.removeDuplicates(categorylist);
            if(uniqueCategory.length > 0){
              setCategoryList(uniqueCategory);
            }
          }) 
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <>
    <div className='popular-search'>
        <h4>Popular Categories on this Shop</h4>
        <ul>
          {categoryList.length > 0 ?(
            <>
              {categoryList.map((category) => {
                  return(
                    <>
                    <li>{category}</li>
                    </>
                  )
                })}
            </>
          ):('')}
        </ul>
    </div>
    </>
  )
}

export default PopularProductSearch