import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ProductServices from '../../../services/API/ProductServices'; //~/services/API/ProductServices
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
        {/* <h4>Antiques</h4> */}

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

        <ul>
          {/* <li><Link to="#">Basketball Shoes</Link></li>
          <li><Link to="#">Boots</Link></li>
          <li><Link to="#">Football Shoes</Link></li>
          <li><Link to="#">Gym & Training Shoes</Link></li>
          <li><Link to="#">Heels & Pumps</Link></li>
          <li><Link to="#">Lace Boots</Link></li>
          <li><Link to="#">Low Shoes</Link></li>
          <li><Link to="#">Outdoor Slippers</Link></li>
          <li><Link to="#">Running Shoes</Link></li> */}
        </ul>
      </div>
    </>
  );
};

export default SubcategoriesList;
