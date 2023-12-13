import React from 'react';
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import ProductImage2 from "../../assets/Images/Productcard/2.png";
import ProductImage3 from "../../assets/Images/Productcard/3.png";
import ProductImage4 from "../../assets/Images/Productcard/4.png";
import ProductImage5 from "../../assets/Images/Productcard/5.png";
import { Link } from 'react-router-dom';
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
    price: 60,
    salePrice: 50,
    image: ProductImage2,
    discount: 50,
    auction: false,
  },
  {
    id: 3,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 60,
    salePrice: 50,
    image: ProductImage3,
    discount: 50,
    auction: false,
  },
  {
    id: 4,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 60,
    salePrice: 50,
    image: ProductImage4,
    discount: 50,
    auction: false,
  },
  {
    id: 5,
    title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
    price: 60,
    salePrice: 50,
    image: ProductImage5,
    discount: 50,
    auction: true,
  },
  
  // Add more products as needed
];

const ProductCard = () => {
  return (
    <>
      <section id='productcard'
      style={{padding: "15px 0px"}}
      >
        <div className='container'>
          <div className='row'>
            {productData.map((product) => (
              <div className='col' key={product.id}>
                <div className='productlist'>
                <Link to="/singleproduct"><img src={product.image} alt={product.title} /></Link>
                {product.auction && <span className='auction-badge'>Auction</span>}
                <div className='px-2'>
                <Link to="/singleproduct"><h4>{product.title}</h4></Link>
                <p>
                    <ul>
                    <li className='price'>${product.salePrice} </li>
                    <li className='sale'><del>${product.price}</del> </li>
                    <li className='discount'>{product.discount}% OFF</li>
                    </ul>
                    </p>
                </div>
                    </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
