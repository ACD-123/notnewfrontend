import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices

const Attribute = () => {
  const [productData, setProductData] = useState([]);
  const [attributes, setProductAttributes] = useState([]);
  const [colors, setColors]=useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const curentAttribute = {};
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      if(response.attributes){
        setProductAttributes(response.attributes);
      //   // setColors(JSON.parse(response.available_colors));
      //   setProductData(response);
      }
      // setProductAttributes(JSON.parse(response.attributes));
      // setColors(JSON.parse(response.available_colors));
      
      // setProductData(response);
    });
  };
  const addAttribute = (e, opt, col) => {
    e.preventDefault();
    if(col === 'color'){
      setSelectedColor(colors)
    }
    if(col === 'quantity'){
      // setSelectedQuantity(parseInt(e.target.value))
      setSelectedQuantity(e.target.value)
    }
    if(col === 'size'){
      setSelectedSize(e.target.value)
    }
    let arributes = localStorage.getItem("arributes");
    if(opt !== '0'){
      curentAttribute[col] = opt;    
      localStorage.setItem('arributes', JSON.stringify(curentAttribute))
    }
  }
  
  useEffect(() => {
    getProduct();
  }, []);
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      quantity: 12,
      colors: ["Red", "Blue", "Green"],
      sizes: ["Small", "Medium", "Large"],
    },
    {
      id: 2,
      name: "Product 2",
      quantity: 8,
      colors: ["Black", "White", "Yellow"],
      sizes: ["Medium", "Large", "Extra Large"],
    },
    {
      id: 3,
      name: "Product 3",
      quantity: 15,
      colors: ["Pink", "Purple", "Orange"],
      sizes: ["Small", "Large", "Extra Large"],
    },
    // Add more products as needed
  ];
      

  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  let quantityList = [];
  let colorList = [];
  let sizeList = [];
  let quantity = 0;
  let sizes = 0;
  return (
    <div className="product-attributes">
      {attributes.length > 0 ? (
        <>
          <div className="inner-attributes">
            {attributes.map((item) => {
              if(item.name === 'quantity'){
                quantityList.push(
                  <option key={item.value} value={item.value}>
                      {item.value}
                  </option>
                );
              }
              return (
                <>
                  {/* <label htmlFor="quantity">Quantity Available:</label>
                  {item.quantity} */}
                </>
              );
            })}
          </div>
          <label htmlFor="color">Available Color:</label>
          {attributes.map((item) => {
            if(item.name === 'color'){
              return(
                <>
                <span style={{ border: "1px solid #000", width:"40px", float: "right", cursor:"pointer", marginRight: "40px", backgroundColor : item.value, color: item.value, borderRadius: "4px"}}>
                  <a href="#"  onClick={(e) => addAttribute(
                    e,
                    item.value,
                    "color"
                  )}>&nbsp;</a>
                </span>
                </>
              )
            }
          })}
          <div className="inner-attributes">
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={selectedQuantity}
              onChange={(e) => addAttribute(
                            e,
                            selectedQuantity,
                            "quantity"
                        )}
              >
              <option value="0">Select Qauntity</option>
              {/* {quantityList.length > 0 ? <> */}
              {quantityList}
              {/* </> : ""} */}
            </select>
          </div>
          <div className="inner-attributes">
          {attributes.map((item) => {
              if(item.name === 'size'){
                sizeList.push(
                  <option key={item.value} value={item.value}>
                      {item.value}
                  </option>
                );
              }
              return (
                <>
                  {/* <label htmlFor="quantity">Quantity Available:</label>
                  {item.quantity} */}
                </>
              );
            })}
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => addAttribute(
                e,
                selectedSize,
                "size"
              )}
            >
              <option value="0" selected>Select Sizes</option>
              {sizeList}
            </select>
            
          </div>
          <div className="inner-attributes">
            <label htmlFor="tags">Tags:</label>
            <p id="tags">
            {JSON.parse(JSON.parse(productData.tags))}
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Attribute;
