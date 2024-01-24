import React from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import ProductImage2 from "../../assets/Images/Categorylisting/2.png";
import ProductImage3 from "../../assets/Images/Categorylisting/3.png";
import ProductImage4 from "../../assets/Images/Categorylisting/4.png";
import ProductImage5 from "../../assets/Images/Categorylisting/5.png";
import {Link} from 'react-router-dom'
const productData = [
  {
    id: 1,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 50,
    salePrice: 40,
    image: ProductImage1,
    discount: 50,
    auction: true,
  },

  {
    id: 2,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 50,
    salePrice: 40,
    image: ProductImage2,
    discount: 50,
  },

  {
    id: 3,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 50,
    salePrice: 40,
    image: ProductImage3,
    discount: 50,
    auction: false,
  },

  {
    id: 4,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 50,
    salePrice: 40,
    image: ProductImage4,
    discount: 50,
    auction: true,
  },
  {
    id: 5,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 50,
    salePrice: 40,
    image: ProductImage5,
    discount: 50,
    auction: true,
  },
  
];

const CategoryProductListing = () => {
  return (
    <>
      <section id='productcard' style={{ padding: "10px 0px" }}>
        <div className='container'>
          <div className='row'>
            {productData.map((product) => (
              <div className='col' key={product.id}>
                <div className='productlist'>
                  {/* Conditional rendering of Link based on auction property */}
                  {product.auction ? (
                    <Link to="/auctionproduct">
                      <img src={product.image} alt={product.title} />
                    </Link>
                  ) : (
                    <Link to="/singleproduct">
                      <img src={product.image} alt={product.title} />
                    </Link>
                  )}
                  {product.auction && <span className='auction-badge'>Auction</span>}
                  {/* Conditional rendering of Link based on auction property */}
                  {product.auction ? (
                    <Link to="/auctionproduct">
                      <h4>{product.title}</h4>
                    </Link>
                  ) : (
                    <Link to="/singleproduct">
                      <h4>{product.title}</h4>
                    </Link>
                  )}
                  <p>
                    <ul>
                      <li className='price'>${product.salePrice} </li>
                      <li className='sale'><del>${product.price}</del> </li>
                      <li className='discount'>{product.discount}% OFF</li>
                    </ul>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryProductListing;
