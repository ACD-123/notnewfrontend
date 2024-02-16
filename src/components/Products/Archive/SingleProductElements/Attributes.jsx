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
      if(response.attributes){
        setProductAttributes(JSON.parse(response.attributes));
        setColors(JSON.parse(response.available_colors));
        setProductData(response);
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
      

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0]);
  let quantityList = [];
  let sizeList = [];
  let quantity = 0;
  let sizes = 0;
  return (
    <div className="product-attributes">
      {attributes.length > 0 ? (
        <>
          <div className="inner-attributes">
            {attributes.map((item) => {
              quantity = item.quantity;
              // for (let i = 0; i < quantity; i++) {
                // quantityList.push(
                //   <option key={i + 1} value={i + 1}>
                //     {i + 1}
                //   </option>
                // );
              // }
              quantityList.push(
                <option key={quantity} value={quantity}>
                     {quantity}
                </option>
              );
              return (
                <>
                  {/* <label htmlFor="quantity">Quantity Available:</label>
                  {item.quantity} */}
                </>
              );
            })}
          </div>
            {colors.length > 0 ?(
              <>
                            <div className="inner-attributes">
            <label htmlFor="color">Available Color:</label>
            {colors.map((color) => {
              return(
                <>
                <a href="#"  onClick={(e) => addAttribute(
                            e,
                            color,
                            "color"
                          )} style={{ width: '30px',  backgroundColor : color, color: color, }}>&nbsp;</a>
                </>
              )
            })}
            
            {/* {colors} */}
            {/* <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="0">Select Select</option>
              {colors.length > 0 ?(
                  <>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      <span style={{ backgroundColor: colors}}>color</span> 
                    </option>
                  ))}
                  </>
                ):('')

              } */}
              {/* {products[0].colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))} */}
            {/* </select> */}
          </div>
              </>
            ):('')}
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
              {attributes.map((item) => {
              sizes = item.size;
              // for (let i = 0; i < sizes; i++) {
                // sizeList.push(
                //   <option key={i + 1} value={i + 1}>
                //     {i + 1}
                //   </option>
                // );
                sizeList.push(
                  <option key={sizes} value={sizes}>
                     {sizes}
                   </option>
                )
              // }
              return(
                sizeList
              )
            })}
            </select>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Attribute;
