import React, {useState, useEffect} from 'react'
import { toast } from "react-toastify";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices

// storeProduct
const PopularProductSearch = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  
  let categoryLists = [];
  const getPopular =()=>{
    try {
      console.log('props.shopId', props.shopId)
      ProductServices.storeCategories(props.shopId)
          .then((response) => {
            for (let i = 0; i < response.length; i++) {
              categoryLists.push({ val: i, text: response[i].category.name }); 
            }
            setCategoryList(categoryLists);
          }) 
      } catch (error) {
        toast.error(error);
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
                    <li>{category.text}</li>
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