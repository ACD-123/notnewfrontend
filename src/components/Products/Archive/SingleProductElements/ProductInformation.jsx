import React, { useState, useEffect } from "react";
import Attribute from "./Attributes";
import ShippingPolicyData from "./ShippingPolicyData";
import { Link, useLocation } from "react-router-dom";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import SellerServices from "../../../../services/API/SellerServices"; //~/services/API/SellerServices
import CheckoutServices from "../../../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
import CartServices from "../../../../services/API/CartServices"; //~/services/API/CartServices
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveCupon, deleteCupon } from "../../../../store/slices/cupon";
import EditListingForm from "../../../AccountsSetting/SellerSetup/EditListingForm";
import { Spinner } from "react-bootstrap";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { isLoggedin } from "../../../../services/Auth";

const ProductInformation = ({ getCartCount, getMoreToLove, setProductId, getCartCountGuest }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  console.log('productData', productData)
  const [gettags, setTags] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Set initial value to true
  const [enabled, setEnabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  let loggedInUser = localStorage.getItem("user_details");
  const [inputError, setInputError] = useState(false);
  const loggedInUsers = JSON.parse(loggedInUser);
  const navigate = useNavigate();
  
  // ali monis
  const [ProductAttribute, SetproductAttribute] = useState([])

  const handelAddonsChange = (e, data, index) => {
    const updatedArray = [...ProductAttribute];
    updatedArray[index] = {
      name: data.name,
      selected: e,
      options: data?.options,
      selectToSend: e.label
    };
    SetproductAttribute(updatedArray);
  }

  let incNum = () => {
    if (quantity < productData?.stockcapacity) {
      setQuantity(Number(quantity) + 1);
    }
  };

  let decNum = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const saveRecentView = () => {
    let data = {
      id: id,
    };
    SellerServices.createRecent(data).then((response) => {
      console.log("response", response);
    });
  };
  const getProduct = () => {
    ProductServices.get(id)
      .then((res) => {
        setProductData(res.data);
        const categoryAddons = res?.data?.attributes?.map(attribute => ({
          name: attribute.key,
          selected: null,
          options: attribute.options.map((option, index) => ({
            value: index + 1,
            label: option
          })),
          selectToSend: null
        }));
        SetproductAttribute(categoryAddons);
        console.log(res?.data, 'getProduct');
        getMoreToLove(res?.data?.id)
        setProductId(res?.data?.id)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const addByNow = (e) => {
    e.preventDefault();
    setInputError(true)
    if (!loggedInUsers) {
      navigate("/signin");
      return;
    } else {
      for (let i = 0; i < ProductAttribute.length; i++) {
        if (ProductAttribute[i].selectToSend === null) {
          return
        }
      }
      setIsLoading(true);
      setEnabled(true);
      const formData = new FormData();
      if (ProductAttribute?.length > 0) {
        let attributes = [];
        for (let i = 0; i < ProductAttribute?.length; i++) {
          attributes.push({ key: ProductAttribute[i].name, value: ProductAttribute[i].selectToSend })
        }
        formData.append('attributes', JSON.stringify(attributes));
      } else {
        formData.append('attributes', JSON.stringify([]));
      }
      formData.append('product_id', productData.id)
      formData.append('quantity', quantity)

      CheckoutServices.save(formData)
        .then((response) => {
          console.log(response)
          navigate('/checkout-buynow')
          setIsLoading(false);
          setEnabled(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
          setEnabled(false);
        })
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    setInputError(true)
    if (isLoggedin()) {
      for (let i = 0; i < ProductAttribute.length; i++) {
        if (ProductAttribute[i].selectToSend === null) {
          return
        }
      }
      setIsLoading(true);
      setEnabled(true);
      const formData = new FormData();
      if (ProductAttribute?.length > 0) {
        let attributes = [];
        for (let i = 0; i < ProductAttribute?.length; i++) {
          attributes.push({ key: ProductAttribute[i].name, value: ProductAttribute[i].selectToSend })
        }
        formData.append('attributes', JSON.stringify(attributes));
      } else {
        formData.append('attributes', JSON.stringify([]));
      }
      formData.append('price', productData.price)
      formData.append('quantity', quantity)
      formData.append('product_id', productData.id)
      formData.append('shop_id', productData.shop?.id,)
      CartServices.save(formData)
        .then((response) => {
          toast.success(response.message);
          getCartCount()
          setIsLoading(false);
          setEnabled(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
          setEnabled(false);
        });
    } else {
      const guest_user_id = localStorage.getItem('guest_user_id');
      for (let i = 0; i < ProductAttribute.length; i++) {
        if (ProductAttribute[i].selectToSend === null) {
          return
        }
      }
      setIsLoading(true);
      setEnabled(true);
      const formData = new FormData();
      if (ProductAttribute?.length > 0) {
        let attributes = [];
        for (let i = 0; i < ProductAttribute?.length; i++) {
          attributes.push({ key: ProductAttribute[i].name, value: ProductAttribute[i].selectToSend })
        }
        formData.append('attributes', JSON.stringify(attributes));
      } else {
        formData.append('attributes', JSON.stringify([]));
      }
      formData.append('price', productData.price)
      formData.append('quantity', quantity)
      formData.append('product_id', productData.id)
      formData.append('shop_id', productData.shop?.id)
      formData.append('user_id', guest_user_id)
      CartServices.saveGuest(formData)
        .then((response) => {
          toast.success(response.message);
          getCartCountGuest()
          setIsLoading(false);
          setEnabled(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
          setEnabled(false);
        });
    }

  };

  const handleQuantity = (e) => {
    if (e.target.value <= productData?.stockcapacity) {
      setQuantity(e.target.value);
    }
  };

  useEffect(() => {
    saveRecentView();
    getProduct();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <div className="p-i">
          <div className="p-i-1">
            <h3 className="p-i-t">{productData.name}</h3>
            <hr />
          </div>
          <div className="p-i-2">
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Condition</div>
              <div className="p-i-2-w-r">{productData?.condition}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Brand</div>
              <div className="p-i-2-w-r">{productData?.brand?.name}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Model</div>
              <div className="p-i-2-w-r">{productData?.model}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Descriptions</div>
              <div className="p-i-2-w-r">{productData?.description}</div>
            </div>

            {ProductAttribute.map((data, index) => {
              return (
                <div className="p-i-2-w" key={index}>
                  <div className="p-i-2-w-l">{data?.name}</div>
                  <div className="p-i-2-w-r">
                    <Select
                      value={data?.selected}
                      onChange={(e) => { handelAddonsChange(e, data, index) }}
                      options={ProductAttribute?.[index]?.options}
                      placeholder={`Select ${data?.name}`}
                    />
                    {data?.selectToSend === null && inputError && <div class="error-input">{data.name} is required</div>}
                  </div>
                </div>

              )
            })}
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Quantity {productData?.stockcapacity} available</div>
              <div className="p-i-2-w-r">
                <div className="price">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button class="btn" type="button" onClick={decNum}>
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      value={quantity}
                      readOnly
                    // onChange={handleQuantity}
                    />
                    <div class="input-group-prepend">
                      <button class="btn" type="button" onClick={incNum}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="p-i-3">
            <div className="p-i-3-w">
              {isLoggedin() ? (
                <>
                  <div className="p-p">
                    <div className="p-p">Price</div>
                    <div className="p-p">${productData.price}</div>
                  </div>
                  <div className="pay-buttons">
                    <button onClick={addByNow}>Buy It Now</button>
                    <button onClick={addToCart} disabled={enabled}>{isLoading ? "loading.." : "Add to Cart"}</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-p">
                    <div className="p-p">Price</div>
                    <div className="p-p">${productData.price}</div>
                  </div>
                  <div className="pay-buttons">
                    <button 
                    onClick={() => {
                      navigate(`/signup`);
                      localStorage.setItem('redirectionPage', pathname)
                    }}
                    >Buy It Now</button>
                    <button onClick={addToCart} disabled={enabled}>{isLoading ? "loading.." : "Add to Cart"}</button>
                  </div>
                </>
              )}
            </div>
            <hr />
          </div>
          <ShippingPolicyData />
        </div>
      )}
    </>
  );
};

export default ProductInformation;
