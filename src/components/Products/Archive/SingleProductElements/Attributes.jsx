import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices";

const Attribute = () => {
  const [productData, setProductData] = useState([]);
  const [attributes, setProductAttributes] = useState([]);
  const [colors, setColors]=useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const curentAttribute = {};
  const getProduct = () => {
    ProductServices.get(id).then((res) => {
      setProductData(res);
      if(res.attributes){
        setProductAttributes(JSON.parse(res.attributes));
      }
    });
  };
  const addAttribute = (e, opt, col) => {
    e.preventDefault();
    if(col === 'color'){
      setSelectedColor(colors)
    }
    if(col === 'quantity'){
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
      {attributes?.length > 0 ? (
        <>
          <div className="inner-attributes">
            {attributes.map((item) => {
              if(item.select){
                return(
                  <>
                    {item.select}
                    <br/>
                  </>
                )
              }
              return (
                <>
                 
                </>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )} 
    </div>
  );
};

export default Attribute;
