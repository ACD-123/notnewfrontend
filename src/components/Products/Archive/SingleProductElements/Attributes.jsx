import React, { useState, useEffect } from 'react';
import ProductServices from '../../../../services/API/ProductServices'; //~/services/API/ProductServices

const Attribute = () => {
  const [productData, setProductData] = useState([]);
  const [attributes, setProductAttributes] = useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const getProduct =() =>{
    ProductServices.get(id)
      .then((response) => {
        setProductAttributes(JSON.parse(response.attributes))
        setProductData(response)
      }) 
  }
  useEffect(() => {
    getProduct();
  }, []);
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      quantity: 12,
      colors: ['Red', 'Blue', 'Green'],
      sizes: ['Small', 'Medium', 'Large'],
    },
    {
      id: 2,
      name: 'Product 2',
      quantity: 8,
      colors: ['Black', 'White', 'Yellow'],
      sizes: ['Medium', 'Large', 'Extra Large'],
    },
    {
      id: 3,
      name: 'Product 3',
      quantity: 15,
      colors: ['Pink', 'Purple', 'Orange'],
      sizes: ['Small', 'Large', 'Extra Large'],
    },
    // Add more products as needed
  ];

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0]);
  let quantity = 0;
  return (
    <div className="product-attributes">
      {attributes.length > 0?(
        <>
          <div className="inner-attributes">
            {attributes.map((item) => {
              quantity = item.quantity;
            return(
              <>
              <label htmlFor="quantity">Quantity Available:</label>
              {item.quantity}
              </>
            ) 
            })}
          </div>
          <div className="inner-attributes">
          <label htmlFor="quantity">Quantity:</label>
          <select
            id="quantity"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
          >
            <option value="0">Select Qauntity</option>
            {
              quantity?.map((val) => {
                return(
                  <option key={val + 1} value={val + 1}>
                    {val + 1}
                  </option>
                )
              })
            }
            {/* {[...Array(quantity).keys()].map((val) => {
              return(
                <option key={val + 1} value={val + 1}>
                  {val + 1}
                </option>
              )
            })} */}
          </select>
        </div>
        <div className="inner-attributes">
          <label htmlFor="color">Color:</label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {products[0].colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="inner-attributes">
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {products[0].sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        </>
      ):(
        ""
      )}
    </div>
  );
};

export default Attribute;
