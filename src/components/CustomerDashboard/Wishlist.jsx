import React, { useState, useEffect } from "react";
import Wishlistimage1 from "../../assets/Images/Categorylisting/1.png";
import Wishlistimage2 from "../../assets/Images/Categorylisting/2.png";
import Wishlistimage3 from "../../assets/Images/Categorylisting/3.png";
import Wishlistimage4 from "../../assets/Images/Categorylisting/4.png";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const getWishlist = () =>{
    ProductServices.getSaved()
    .then((response) => {
      console.log('wishlist', response)
      // setProducts(response.data);
    })
    .catch((e) => {
      console.log('error', e)
    });

  }  
  const initialProducts = [
    {
      id: 1,
      image: Wishlistimage1,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "M",
      price: "221.1",
      saleprice: "219.99",
      color: "Red",
      quantity: 1,
      shipping: "Free",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "663.12",
    },
    {
      id: 2,
      image: Wishlistimage2,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "L",
      price: "621.2",
      saleprice: "229.99",
      color: "Yellow",
      quantity: 2,
      shipping: "Standard",
      selected: false,
      showDropdown: false,
      category: "Fitness, Running & Yoga",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "123.12",
    },
    {
      id: 3,
      image: Wishlistimage3,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "S",
      price: "322.3",
      saleprice: "269.99",
      color: "White",
      quantity: 3,
      shipping: "Express",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "423.12",
    },
    {
      id: 4,
      image: Wishlistimage4,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "XL",
      price: "112.1",
      saleprice: "269.99",
      color: "Black",
      quantity: 1,
      shipping: "Free",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "6643.12",
    },
  ];


  const deleteSelectedProducts = () => {
    const updatedProducts = products.filter((product) => !product.selected);
    setProducts(updatedProducts);
  };

  const buyNow = (productId) => {
    // Logic for 'Buy Now' functionality
    console.log(`Buy Now: Product ID ${productId}`);
  };

  const makeOffer = (productId) => {
    // Logic for 'Make Offer' functionality
    console.log(`Make Offer: Product ID ${productId}`);
  };

  const moreActions = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, showDropdown: !product.showDropdown }
        : { ...product, showDropdown: false }
    );
    setProducts(updatedProducts);
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    let filteredProducts = initialProducts;
    if (category !== "All Categories") {
      filteredProducts = initialProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    setProducts(filteredProducts);
  };
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <section id="wishlist-dashboard">
      <h3>Wishlist</h3>
      <div className="row wishlist align-items-center">
        <hr style={{ marginTop: "20px" }} />
      </div>
      {products.saved_products?.length > 0 ?(
        <>
        <h3>Store: {products.shop.fullname}</h3>
        <div className="wishlist">
        {products.saved_products?.map((product) => {
          let attributes = JSON.parse(product.attributes);
          return(
          <div key={product.id} className="product">
            {/* START ROW */}
            <div className="row">
              <div className="col-lg-7">
                <div className="wishlistproduct-detail">
                  <div>
                    {/* <img src={product.image} alt={product.title} /> */}
                    <img src={Wishlistimage2} alt={product.title} />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    {attributes.length > 0 ? (
                      <>
                      {attributes.map((attribute) => {
                        let color = attribute.color;
                        return(
                          <>
                             <p>
                              Size: {attribute.size}, Color: <div style={{ background: color, width: "20px"}}>&nbsp;</div>
                            </p>
                            <p>Quantity: {attribute.quantity}</p>
                          </>
                        )
                      })}
                      </>
                    ):("")}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-lg-2">
                <div className="wishlistprice-detials">
                  <h3>US ${product.price}</h3>
                  <p>Shipping cost 10% off {product.shippingprice}</p>
                </div>
                <br />
                <p>Shipping: $ {product.shipping_price}</p>
                     
                <p>Shipping Company: <span  className="shipingname">{product.company}</span></p>
              </div>
              <div className="col-lg-3 wishlist-buttonss">
                <Link to="/checkout">
                  <button
                    className="buynow-wishlist"
                    onClick={() => buyNow(product.guid)}
                  >
                    Buy It Now
                  </button>
                </Link>
              </div>
              <hr />
            </div>
            {/* END ROW */}
          </div>
        )})}
      </div>
        </>
      ):("")}
    </section>
  );
};

export default Wishlist;
