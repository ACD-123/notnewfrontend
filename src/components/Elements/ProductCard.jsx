import React, { useState, useEffect } from "react";
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import ProductImage2 from "../../assets/Images/Productcard/2.png";
import ProductImage3 from "../../assets/Images/Productcard/3.png";
import ProductImage4 from "../../assets/Images/Productcard/4.png";
import ProductImage5 from "../../assets/Images/Productcard/5.png";
import blank from "../../assets/Images/Productcard/blank.jpg";
import closeImg from "../../assets/Images/close.png";
import ListingForm from "../AccountsSetting/SellerSetup/ListingForm";
import { Link } from "react-router-dom";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";

const ProductCard = (props) => {
  let status = props.status;
  let edit = props.edit;
  const [productData, setProductData] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [editform, setEditForm] = useState(false); // State for showing the popup
  const [guid, setGuid] = useState(""); // State for showing the popup
  const [submitted, setSubmitted] = useState(false);

  const fetchProductData = async () => {
    // try {
      if (status == "active") {
        ProductServices.selfValue(status).then((response) => {
          if(response.data){
            if (response.data.length > 0) {
              setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
            }
          }
        }).catch(error =>  console.error('Error fetching product data:', error));
      } else if (status == "inactive") {
        ProductServices.selfValue(status).then((response) => {
          if(response.data){
            if (response.data.length > 0) {
              setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
            }
          }
        }).catch(error =>  console.error('Error fetching product data:', error));
      } else if (status == "scheduled") {
        ProductServices.selfValue(status).then((response) => {
          if(response.data){
            if (response.data.length > 0) {
              setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
            }
          }
        }).catch(error =>  console.error('Error fetching product data:', error));
      } else if (props.products) {
        if (props.products.data?.length > 0) {
          setProductData(props.products.data.slice(0, 6));
        }
      } else {
        ProductServices.all().then((response) => {
          if (response.data) {
            setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
          }
        }).catch(error =>  console.error('Error fetching product data:', error));
      }
    // } catch (error) {
    //   toast.error(error);
    // }
  };
  const confirmDelete = (e, val) => {
    setShowPopup(true);
    setGuid(val);
  };
  const deleteProduct = (e, val) => {
    e.preventDefault();
    try {
      ProductServices.destroy(val).then((response) => {
        toast.error(response.message);
        setShowPopup(false);
        fetchProductData();
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const editProduct = (e, val) => {
    e.preventDefault();
    props.parentCallback("Edit", val);
  };

  useEffect(() => {
    // if(props.products.data > 0){
    //   setProductData(props.products.data.slice(0, 6));
    // }else{
      fetchProductData();
    // }
    
  }, []);
  return (
    <>
      <section id="productcard" style={{ padding: "15px 0px" }}>
        <div className="container">
          <div className="row">
            {productData.length > 0 ? (
              <>
                {productData.map((product) => {
                  return (
                    <>
                      <div className="col col-lg-2" key={product.guid}>
                        <div className="productlist">
                          {product.auctioned ? (
                            <>
                              {/* <Link to={`/auctionproduct/${product.id}`}> */}
                              <Link to={`/auctionproduct/${product.guid}`}>
                              {product.media.length == 0? (
                                <>
                                  <img
                                    src={blank}
                                    alt="blank"
                                  />
                                </>
                              ):(
                                <>
                                {product.media?.map((media, index) => {
                                  if (index == 0) {
                                    return (
                                      <>
                                        <Link
                                          to={`/singleproduct/${product.guid}`}
                                        >
                                          <img
                                            src={media.name}
                                            alt={product.name}
                                          />
                                          {/* <img src={product.cover_image} alt={product.name} /> */}
                                        </Link>
                                      </>
                                    );
                                  }
                                })}
                                </>
                              )}
                                
                                {/* <img src={product.cover_image} alt={product.name} /> */}
                              </Link>
                            </>
                          ) : (
                            <>
                            {product.media.length == 0? (
                                <>
                                  <img
                                    src={blank}
                                    alt="blank"
                                  />
                                </>):(
                                  <>
                                  {product.media?.map((media, index) => {
                                      if (index == 0) {
                                        return (
                                          <>
                                            <Link
                                              to={`/singleproduct/${product.guid}`}
                                            >
                                              <img
                                                src={media.name}
                                                alt={product.name}
                                              />
                                              {/* <img src={product.cover_image} alt={product.name} /> */}
                                            </Link>
                                          </>
                                        );
                                      }
                                    })}
                                  </>
                                )}
                              
                              {/* <Link to={`/singleproduct/${product.id}`}> */}
                            </>
                          )}
                          {product.auctioned ? (
                            <span className="auction-badge">Auction</span>
                          ) : (
                            ""
                          )}
                          <div className="px-2">
                            {product.auctioned ? (
                              <Link to={`/auctionproduct/${product.guid}`}>
                                <h3>{product.name.substring(0, 6)}...</h3>
                                <h4>
                                  {product.description.substring(0, 8)}...
                                </h4>
                              </Link>
                            ) : (
                              <Link to={`/singleproduct/${product.guid}`}>
                                <h3>{product.name.substring(0, 6)}...</h3>
                                <h4>
                                  {product.description.substring(0, 8)}...
                                </h4>
                              </Link>
                            )}
                            <p>
                              <b>Condition:</b> 
                              <br />
                              {product.condition}
                            </p>
                            <p>
                              {product.auctioned ? (
                                <>
                                  <ul>
                                    <li className="sale">
                                      <p>
                                        <b>Bids: </b>$ {product.bids}
                                      </p>
                                    </li>
                                    {(product.price !== null &&
                                      product.sale_price !== null) ||
                                      (product.sale_price !== 0 && (
                                        <li className="sale">
                                          <del>${product.price}</del>
                                        </li>
                                      ))}
                                    {(product.price !== null &&
                                      product.sale_price !== null) ||
                                      (product.sale_price !== 0 && (
                                        <li className="discount">
                                          {(
                                            ((product.price -
                                              product.sale_price) /
                                              product.price) *
                                            100
                                          ).toFixed(2)}
                                          % OFF
                                        </li>
                                      ))}
                                  </ul>
                                </>
                              ) : (
                                <>
                                  <ul>
                                    <li className="sale">
                                      <p>
                                        <b>Price: </b>$ {product.price}
                                      </p>
                                    </li>
                                    {(product.price !== null &&
                                      product.sale_price !== null) ||
                                      (product.sale_price !== 0 && (
                                        <li className="sale">
                                          <del>${product.price}</del>
                                        </li>
                                      ))}
                                    {(product.price !== null &&
                                      product.sale_price !== null) ||
                                      (product.sale_price !== 0 && (
                                        <li className="discount">
                                          {(
                                            ((product.price -
                                              product.sale_price) /
                                              product.price) *
                                            100
                                          ).toFixed(2)}
                                          % OFF
                                        </li>
                                      ))}
                                  </ul>
                                </>
                              )}
                              <ul>
                                {(() => {
                                  if (edit == "edit") {
                                    return (
                                      <li>
                                        <nav>
                                          <a
                                            href="#"
                                            onClick={(e) =>
                                              editProduct(e, product.guid)
                                            }
                                          >
                                            Edit
                                          </a>{" "}
                                          |{" "}
                                          <a
                                            href="#"
                                            onClick={(e) =>
                                              confirmDelete(e, product.guid)
                                            }
                                            style={{ color: "red" }}
                                          >
                                            Delete
                                          </a>
                                        </nav>
                                      </li>
                                    );
                                  } else {
                                    return <div>&nbsp;</div>;
                                  }
                                })()}
                              </ul>
                              <div className="popup">
                                {/* Popup for successful product activation */}
                                {showPopup && (
                                  <div className="listing-activated">
                                    <div className="innerlisting-activated">
                                      <img
                                        src={closeImg}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                      />
                                      <h2>Are you sure you want to Delete?</h2>
                                      <table
                                        style={{
                                          width: "30%",
                                          margin: "0px auto",
                                        }}
                                      >
                                        <tr>
                                          <td>
                                            <input
                                              type="submit"
                                              value="Delete"
                                              onClick={(e) =>
                                                deleteProduct(e, guid)
                                              }
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="button"
                                              value="Cancel"
                                              onClick={() =>
                                                setShowPopup(false)
                                              }
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                      <button
                                        onClick={() => setShowPopup(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              "No Product Exists"
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
