import React,{useState, useEffect} from 'react'
import ProductServices from '../../../services/API/ProductServices';
import { toast } from 'react-toastify';

const SubcategoriesList = (props) => {
  const [categories, setCategoryData] = useState([]);
  const handleAllCategory  = (e) =>{
    e.preventDefault();
    props.parentCallback('all');
  }
  const getCategories= () =>{
    ProductServices.getCategories()
      .then((response) => {
        if(response.status){
          setCategoryData(response.data);
        }
      }).catch(error => {
        toast.error(error?.response?.data?.message)
      }); 
  }
  const handleCategory  = (e, catId) =>{
    e.preventDefault();
    props.parentCallback(catId);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className='subcategory-list'>
        {categories?.length > 0 ? (<>
          <ul>
          {categories.map((category, index) => {
            return(
              <>
                <li key={index}>
                  <a href="#" onClick={(e) =>
                  handleCategory(e,category.id)
                  }>{category.name}</a>
                </li>
              </>
            )
          })}
          <li>
            <a href="#" onClick={(e) =>
            handleAllCategory(e)
            }>All</a>
          </li>
          </ul>
        </>):('')}
      </div>
    </>
  );
};

export default SubcategoriesList;
