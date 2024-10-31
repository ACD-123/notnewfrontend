import React, { useEffect, useRef, useState } from "react";
import Location from "../../assets/Images/deliveryimage.png";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import LoadingComponents from "../Shared/LoadingComponents";
import NoDataFound from "../Shared/NoDataFound";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const CustomerCompleteOrder = ({ detail, setDetail, getProductManagmentOderCount }) => {
  const [completedOders, setCompletedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState(false);
  const [pendingOrderDetail, setPendingOrderDetail] = useState([]);
  const [pendingOrderAttributes, setPendingOrderAttributes] = useState([]);
  const [reviewStar, setReviewStar] = useState('');
  const [description, setdescription] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selectedRefundIndex, setSelectedRefundIndex] = useState('');
  const [inputError, setInputError] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [oderDetailResponse, setOderDetailResponse] = useState([])
  const [formStructure, setFormStructure] = useState([])
  const [oderId, setOderId] = useState('')
  let parentIndex = '';
  let childIndex = '';

  const getCompletedOders = () => {
    OrderServices.customerCompleteOrders()
      .then((response) => {
        setCompletedOrders(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  const getCompletedOdersDetail = (order_id, condition) => {
    setIsLoading(true);
    setDetail(true)
    setReview(condition)
    OrderServices.getPendingOdersDetail(order_id , 1 , 2)
      .then((response) => {
        setPendingOrderDetail(response?.data)
        setIsLoading(false);
        let tempArr = []
        setdescription('')
        setOderDetailResponse(response?.data?.products)
        for (let i = 0; i < response?.data?.products.length; i++) {
          setdescription((prev) => ({
            ...prev,
            [`description${i}`]: ''
          }));
          setReviewStar((prev) => ({
            ...prev,
            [`star${i}`]: 0
          }));
          const attributes = response?.data?.products?.[i]?.attributes;
          const validJsonString = attributes.replace(/([{,]\s*)(\w+|\w+\s+\w+)(\s*:)/g, '$1"$2"$3').replace(/(:\s*)(\w+|\w+\s+\w+)(\s*[},])/g, '$1"$2"$3');
          const normalArray = JSON.parse(validJsonString);
          tempArr.push(normalArray)
        }
        setPendingOrderAttributes(tempArr)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  const getRefundOdersDetail = (order_id, condition) => {
    setIsLoading(true);
    setDetail(true)
    setShowRefund(true)
    setReview(condition)
    setOderId(order_id)
    OrderServices.getRefundOdersDetail(order_id , 1)
      .then((response) => {
        if(response?.data?.stores.length > 0){
          setPendingOrderDetail(response?.data)
          setIsLoading(false);
          setFormStructure([])
          const tempParent = []
          const tempChild = []
          for (let i = 0; i < response?.data?.stores.length; i++) {
            for (let j = 0; j < response?.data?.stores[i].products.length; j++) {
              tempChild.push({ reason: '', images: [] }
              )
            }
            tempParent.push(tempChild)
          }
          setFormStructure(tempParent)
        }else{
          setDetail(false); 
          setReview(false); 
          setShowRefund(false);
          getCompletedOders();
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  const customerOderReview = (e, id, i) => {
    e.preventDefault();
    setSelectedIndex(i);
    setInputError(true)
    if (description[`description${i}`] != "") {
      OrderServices.customerOderReview({
        product_id: id,
        comments: description[`description${i}`],
        rating: reviewStar[`star${i}`]
      })
        .then((response) => {
          setInputError(false)
          setSelectedIndex('');
          setdescription((prev) => ({ ...prev, [`description${i}`]: '' }))
          setReviewStar((prev) => ({ ...prev, [`star${i}`]: 0 }))
          toast.success(response.data);
          setReviewStar(0)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    }
  }

  useEffect(() => {
    getCompletedOders();
  }, []);

  const reOrder = (e) => {
    e.preventDefault();

    for (let i = 0; i < oderDetailResponse.length; i++) {
      let tempArr = []
      const attributes = oderDetailResponse[i].attributes;
      const validJsonString = attributes.replace(/([{,]\s*)(\w+|\w+\s+\w+)(\s*:)/g, '$1"$2"$3').replace(/(:\s*)(\w+|\w+\s+\w+)(\s*[},])/g, '$1"$2"$3');
      const normalArray = JSON.parse(validJsonString);
      tempArr.push(normalArray)
      OrderServices.customerReOrder(JSON.stringify([{
        product_id: oderDetailResponse[i].id,
        price: oderDetailResponse[i].producttotal,
        quantity: oderDetailResponse[i].quantity,
        attributes: JSON.stringify(tempArr)
      }]))
        .then((response) => {
          toast.success(response?.message);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });

    }
  };

  const filterAttribute = (attribute) => {
    const attributes = attribute;
    const validJsonString = attributes.replace(/([{,]\s*)(\w+|\w+\s+\w+)(\s*:)/g, '$1"$2"$3').replace(/(:\s*)(\w+|\w+\s+\w+)(\s*[},])/g, '$1"$2"$3');
    let normalArray = JSON.parse(validJsonString);
    return normalArray
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = (i, k) => {
    fileInputRef.current.click();
    parentIndex = i;
    childIndex = k
  };

  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let oldData = formStructure;
    oldData[parentIndex][childIndex]['images'].push(...selectedFiles);
    setFormStructure((prev) => [...oldData])
  };


  const handleDeleteImage = (parentIndex, childIndex, image) => {
    let oldData = formStructure;
    const index = oldData[parentIndex][childIndex]['images'].indexOf(image);
    oldData[parentIndex][childIndex]['images'].splice(index, 1);
    setFormStructure((prev) => [...oldData])
  };

  const addRefund = (e, productId, reason, images, index, k) => {
    e.preventDefault();
    setSelectedRefundIndex(productId)
    setInputError(true)
    if (formStructure?.[index]?.[k]?.reason != "" && formStructure?.[index]?.[k]?.images.length > 0) {
      setIsLoading(true)
      const formData = new FormData();
      formData.append("order_id", oderId);
      formData.append("product_id", productId);
      formData.append("reason", reason);
      formStructure?.[index]?.[k]?.images.forEach((image_file) => {
        formData.append("file[]", image_file);
      });
      OrderServices.orderRefund(formData)
        .then((response) => {
          setInputError(false);
          setFormStructure([]);
          setSelectedRefundIndex('');
          getRefundOdersDetail(oderId, true);
          toast.success(response.data);
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error?.response?.data?.message)
        });
    }

  }

  const onReasonChnage = (e, i, k) => {
    const oldData = formStructure;
    oldData[i][k]['reason'] = e;
    setFormStructure(oldData)
  }

  return (
    <div className="pending-oder-managment">
      {isLoading ?
        <LoadingComponents />
        :
        (!detail ?
          <div className="p-o-m-w">
            {completedOders?.length > 0 ?
              <div className="p-o-m-w-l">
                {completedOders?.map((data, index) => {
                  return (
                    <ul key={index}>
                      <li>
                        <div className="p-o-m-w-l-l">
                          <div className="p-o-m-w-l-l-l">
                            <img src={data?.details?.product?.media?.[0]?.name} alt="Product" />
                          </div>
                          <div className="p-o-m-w-l-l-r">
                            <h2><span>Order # : </span>{data?.orderid}</h2>
                            <h3>Customer Name : {data?.fullname}</h3>
                            <p>Orders Status : {data?.status}</p>
                          </div>
                        </div>
                        <div className="p-o-m-w-l-r">
                          <div className="p-o-m-w-l-r-w-d">
                            <button onClick={() => { getCompletedOdersDetail(data?.order_id, false) }}>Review</button>
                            <button onClick={() => { getRefundOdersDetail(data?.order_id, false) }}><span>Refund</span></button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )
                })}
              </div>
              :
              <NoDataFound title={'No Data Found'} />
            }
          </div>
          :
          showRefund ?
            <div className="seller-oder-managment-detail">
              <div className="title"><span onClick={() => { setDetail(false); setReview(false); setShowRefund(false) }}><IoIosArrowBack /></span>Completed Order Details</div>
              <div className="s-o-m-d-1">
                <div className="s-o-m-d-1-l">
                  {/* <span>Seller : </span>{pendingOrderDetail?.products?.[0]?.seller} */}
                </div>
                <div className="s-o-m-d-1-r">
                  <span>ORDER # :</span> {pendingOrderDetail?.orderid}
                </div>
              </div>
              <div className="s-o-m-d-2">
                <h2>Ship to</h2>
                <div className="s-o-m-d-2-1">
                  <div className="s-o-m-d-2-1-l">
                    <img src={Location} alt="location" />
                    <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11.9727" cy="11.2344" r="5" fill="white" />
                      <path d="M11.9727 0.234375C9.05634 0.237815 6.26045 1.39785 4.19829 3.46C2.13614 5.52216 0.976108 8.31805 0.972668 11.2344C0.969175 13.6176 1.74765 15.9362 3.18867 17.8344C3.18867 17.8344 3.48867 18.2294 3.53767 18.2864L11.9727 28.2344L20.4117 18.2814C20.4557 18.2284 20.7567 17.8344 20.7567 17.8344L20.7577 17.8314C22.198 15.934 22.9761 13.6165 22.9727 11.2344C22.9692 8.31805 21.8092 5.52216 19.747 3.46C17.6849 1.39785 14.889 0.237815 11.9727 0.234375ZM11.9727 15.2344C11.1815 15.2344 10.4082 14.9998 9.75039 14.5603C9.09259 14.1207 8.5799 13.496 8.27715 12.7651C7.9744 12.0342 7.89519 11.2299 8.04953 10.454C8.20387 9.67809 8.58483 8.96536 9.14424 8.40595C9.70365 7.84654 10.4164 7.46557 11.1923 7.31123C11.9682 7.15689 12.7725 7.23611 13.5034 7.53886C14.2343 7.84161 14.859 8.3543 15.2985 9.01209C15.7381 9.66989 15.9727 10.4432 15.9727 11.2344C15.9713 12.2948 15.5495 13.3115 14.7996 14.0613C14.0498 14.8112 13.0331 15.2331 11.9727 15.2344Z" fill="url(#paint0_linear_14_34179)" />
                      <defs>
                        <linearGradient id="paint0_linear_14_34179" x1="11.9727" y1="0.234375" x2="11.9727" y2="28.2344" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#8B2CA0" />
                          <stop offset="1" stop-color="#00C3C9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="s-o-m-d-2-1-r">
                    <ul>
                      <li>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.28424 6.71301C5.48905 6.71301 5.69186 6.67267 5.88108 6.59429C6.0703 6.51591 6.24224 6.40103 6.38706 6.2562C6.53189 6.11138 6.64677 5.93945 6.72515 5.75022C6.80353 5.561 6.84387 5.35819 6.84387 5.15338C6.84387 4.94857 6.80353 4.74576 6.72515 4.55653C6.64677 4.36731 6.53189 4.19538 6.38706 4.05055C6.24224 3.90573 6.0703 3.79085 5.88108 3.71247C5.69186 3.63409 5.48905 3.59375 5.28424 3.59375C4.8706 3.59375 4.4739 3.75807 4.18141 4.05055C3.88893 4.34304 3.72461 4.73974 3.72461 5.15338C3.72461 5.56702 3.88893 5.96372 4.18141 6.2562C4.4739 6.54869 4.8706 6.71301 5.28424 6.71301Z" stroke="url(#paint0_linear_14_34174)" />
                          <path d="M1.09401 4.24423C2.07877 -0.0847405 8.49224 -0.0797416 9.47201 4.24923C10.0469 6.78862 8.46725 8.93811 7.08258 10.2678C6.59873 10.7344 5.95273 10.9952 5.28051 10.9952C4.60829 10.9952 3.96229 10.7344 3.47844 10.2678C2.09877 8.93811 0.519142 6.78362 1.09401 4.24423Z" stroke="url(#paint1_linear_14_34174)" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34174" x1="5.28424" y1="3.59375" x2="5.28424" y2="6.71301" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_14_34174" x1="5.283" y1="1" x2="5.283" y2="10.9952" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.shipmentaddress}
                      </li>
                      <li>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.9727 9.165C10.9727 9.345 10.9326 9.53 10.8475 9.71C10.7623 9.89 10.6522 10.06 10.507 10.22C10.2616 10.49 9.99118 10.685 9.68573 10.81C9.38528 10.935 9.05979 11 8.70926 11C8.1985 11 7.65268 10.88 7.07681 10.635C6.50095 10.39 5.92508 10.06 5.35423 9.645C4.77241 9.22005 4.22338 8.75207 3.71176 8.245C3.20539 7.736 2.73835 7.18944 2.31467 6.61C1.90405 6.04 1.57356 5.47 1.3332 4.905C1.09284 4.335 0.972656 3.79 0.972656 3.27C0.972656 2.93 1.03275 2.605 1.15293 2.305C1.27311 2 1.46339 1.72 1.72879 1.47C2.04927 1.155 2.3998 1 2.77035 1C2.91056 1 3.05077 1.03 3.17596 1.09C3.30616 1.15 3.42133 1.24 3.51146 1.37L4.67321 3.005C4.76334 3.13 4.82844 3.245 4.87351 3.355C4.91858 3.46 4.94361 3.565 4.94361 3.66C4.94361 3.78 4.90856 3.9 4.83846 4.015C4.77336 4.13 4.67821 4.25 4.55803 4.37L4.17746 4.765C4.12238 4.82 4.09734 4.885 4.09734 4.965C4.09734 5.005 4.10235 5.04 4.11237 5.08C4.12739 5.12 4.14241 5.15 4.15243 5.18C4.24256 5.345 4.39779 5.56 4.61812 5.82C4.84346 6.08 5.08382 6.345 5.34421 6.61C5.61462 6.875 5.87501 7.12 6.14041 7.345C6.4008 7.565 6.61612 7.715 6.78638 7.805C6.81141 7.815 6.84146 7.83 6.87651 7.845C6.91657 7.86 6.95663 7.865 7.0017 7.865C7.08683 7.865 7.15193 7.835 7.20701 7.78L7.58758 7.405C7.71277 7.28 7.83295 7.185 7.94812 7.125C8.06329 7.055 8.17846 7.02 8.30365 7.02C8.3988 7.02 8.49895 7.04 8.60911 7.085C8.71928 7.13 8.83445 7.195 8.95964 7.28L10.6171 8.455C10.7473 8.545 10.8375 8.65 10.8925 8.775C10.9426 8.9 10.9727 9.025 10.9727 9.165Z" stroke="url(#paint0_linear_14_34168)" stroke-miterlimit="10" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34168" x1="5.97266" y1="1" x2="5.97266" y2="11" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.phone}
                      </li>
                      <li>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.03561 6.28853C4.97599 6.28257 4.90445 6.28257 4.83887 6.28853C4.15458 6.2653 3.5062 5.97663 3.03104 5.48367C2.55588 4.9907 2.29125 4.33214 2.29319 3.64746C2.29319 2.18682 3.47362 1.00043 4.94022 1.00043C5.28744 0.994167 5.6325 1.05636 5.95569 1.18344C6.27888 1.31053 6.57387 1.50004 6.82382 1.74113C7.07377 1.98222 7.27379 2.27019 7.41245 2.58858C7.55111 2.90698 7.6257 3.24956 7.63197 3.59679C7.63823 3.94401 7.57604 4.28906 7.44895 4.61225C7.32186 4.93544 7.13236 5.23043 6.89127 5.48038C6.65017 5.73033 6.36221 5.93035 6.04382 6.06901C5.72542 6.20768 5.38283 6.28227 5.03561 6.28853ZM2.05472 8.48843C0.611968 9.45424 0.611968 11.0281 2.05472 11.988C3.69421 13.085 6.38297 13.085 8.02247 11.988C9.46522 11.0222 9.46522 9.44828 8.02247 8.48843C6.38894 7.39742 3.70017 7.39742 2.05472 8.48843Z" stroke="url(#paint0_linear_14_34171)" stroke-width="0.894267" strokeLinecap="round" stroke-linejoin="round" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34171" x1="5.03859" y1="1" x2="5.03859" y2="12.8107" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.name}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="s-o-m-d-3">
                <div className="s-o-m-d-3-l">
                  <h3>Delivery Details</h3>
                  <p>Est Delivery: Tue, <span>Dec 15</span> -Wed, <span>Dec 16</span></p>
                </div>
                <div className="s-o-m-d-3-r">
                  <div className="s-o-m-d-3-r-a">
                    <div className="s-o-m-d-3-r-a-l">
                      <div className="s-o-m-d-3-r-a-l-w" style={{ justifyContent: 'center' }}>Completed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="s-o-m-d-4" style={{ marginTop: review ? '30px' : '0px' }}>
                <div className="d-4-1">
                  {pendingOrderDetail?.stores?.map((store, index) => {
                    return (
                      <div key={index}>
                        <h2 style={{ marginBottom: '20px' }}>{store?.name}</h2>
                        {store?.products?.map((data, k) => {
                          return (
                            <div className="refund-product" key={k}>
                              <div className="d-4-1-w" >
                                <div className="d-4-1-l">
                                  <img src={data?.media?.name} alt="Product" />
                                </div>
                                <div className="d-4-1-r">
                                  <h4>{data?.name}</h4>
                                  <div className="d-4-1-r-1">
                                    <div className="d-4-1-r-1-l">
                                      <h5>${data?.producttotal}</h5>
                                      <p>Quantity :<span>{data?.quantity}</span></p>
                                    </div>
                                    <div className="d-4-1-r-1-r">
                                      <ul>
                                        {filterAttribute(data?.attributes)?.map((data, j) => {
                                          return (
                                            <li key={j}>
                                              <p>{data?.key} : </p>
                                              <ul>
                                                <li>{data?.value}</li>
                                              </ul>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="form">
                                <div className="p-m-i-u">
                                  <div className="p-m-i-u-wrap">
                                    <div className="upload-box" onClick={() => { handleUploadClick(index, k) }}>
                                      <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" strokeLinecap="round" stroke-linejoin="round" />
                                      </svg>
                                      <span>Click here to upload images</span>
                                      <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageFileChange}
                                        multiple  // Enable multiple file selection
                                      />
                                    </div>
                                  </div>
                                  {
                                    formStructure?.[index]?.[k]?.images.length === 0 &&
                                    selectedRefundIndex == data?.id &&
                                    inputError &&
                                    <div className="error-input">Atleast  one image is required</div>}

                                  {formStructure?.length > 0 &&
                                    <div className="selected-images">
                                      <div className="row">
                                        {formStructure?.[index]?.[k]?.images.map((image, l) => {
                                          return (
                                            <div className="col-lg-2" key={l}>
                                              <div className="selected-images-box">
                                                <img src={URL.createObjectURL(image)} alt="" />
                                                <span onClick={() => { handleDeleteImage(index, k, image) }}><MdDelete /></span>
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>}

                                </div>
                                <textarea defaultValue={formStructure[index][k]?.reason} onChange={(e) => { onReasonChnage(e.target.value, index, k) }}></textarea>
                                {
                                  formStructure?.[index]?.[k]?.reason === "" &&
                                  selectedRefundIndex == data?.id &&
                                  inputError &&
                                  <div className="error-input">Reason is required</div>}
                                <div className="button">
                                  <button onClick={(e) => { addRefund(e, data?.id, formStructure[index][k]?.reason, formStructure?.[index]?.[k]?.images, index, k) }}>Refund</button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
                <>
                  <div className="d-4-2">
                    <ul>
                      <li>
                        <ul>
                          <li>Subtotal ( {pendingOrderDetail?.products?.[0]?.quantity} item )</li>
                          <li>${pendingOrderDetail?.subtotal}</li>
                        </ul>
                        <ul>
                          <li>Shipping</li>
                          <li>${pendingOrderDetail?.shippingcost}</li>
                        </ul>
                        {pendingOrderDetail?.voucher_discount > 0 ?
                      <ul>
                        <li>Voucher Discount</li>
                        <li>-${pendingOrderDetail?.voucher_discount}</li>
                      </ul>
                      :
                      null
                      }
                      </li>
                    </ul>
                  </div>
                  <div className="d-4-3">
                    <ul>
                      <li>
                        <ul>
                          <li>Order Total</li>
                          <li>${pendingOrderDetail?.ordertotal}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </>
              </div>
              {/* <div className="s-o-m-d-11">
                <form onSubmit={reOrder}>
                  <button>Confirm Re-Order</button>
                </form>
              </div> */}
            </div>
            :
            <div className="seller-oder-managment-detail">
              <div className="title"><span onClick={() => { setDetail(false); setReview(false); setShowRefund(false) }}><IoIosArrowBack /></span>Completed Order Detailsss</div>
              <div className="s-o-m-d-1">
                <div className="s-o-m-d-1-l">
                  <span>Seller : </span>{pendingOrderDetail?.products?.[0]?.seller}
                </div>
                <div className="s-o-m-d-1-r">
                  <span>ORDER # :</span> {pendingOrderDetail?.orderid}
                </div>
              </div>
              <div className="s-o-m-d-2">
                <h2>Ship to</h2>
                <div className="s-o-m-d-2-1">
                  <div className="s-o-m-d-2-1-l">
                    <img src={Location} alt="location" />
                    <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11.9727" cy="11.2344" r="5" fill="white" />
                      <path d="M11.9727 0.234375C9.05634 0.237815 6.26045 1.39785 4.19829 3.46C2.13614 5.52216 0.976108 8.31805 0.972668 11.2344C0.969175 13.6176 1.74765 15.9362 3.18867 17.8344C3.18867 17.8344 3.48867 18.2294 3.53767 18.2864L11.9727 28.2344L20.4117 18.2814C20.4557 18.2284 20.7567 17.8344 20.7567 17.8344L20.7577 17.8314C22.198 15.934 22.9761 13.6165 22.9727 11.2344C22.9692 8.31805 21.8092 5.52216 19.747 3.46C17.6849 1.39785 14.889 0.237815 11.9727 0.234375ZM11.9727 15.2344C11.1815 15.2344 10.4082 14.9998 9.75039 14.5603C9.09259 14.1207 8.5799 13.496 8.27715 12.7651C7.9744 12.0342 7.89519 11.2299 8.04953 10.454C8.20387 9.67809 8.58483 8.96536 9.14424 8.40595C9.70365 7.84654 10.4164 7.46557 11.1923 7.31123C11.9682 7.15689 12.7725 7.23611 13.5034 7.53886C14.2343 7.84161 14.859 8.3543 15.2985 9.01209C15.7381 9.66989 15.9727 10.4432 15.9727 11.2344C15.9713 12.2948 15.5495 13.3115 14.7996 14.0613C14.0498 14.8112 13.0331 15.2331 11.9727 15.2344Z" fill="url(#paint0_linear_14_34179)" />
                      <defs>
                        <linearGradient id="paint0_linear_14_34179" x1="11.9727" y1="0.234375" x2="11.9727" y2="28.2344" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#8B2CA0" />
                          <stop offset="1" stop-color="#00C3C9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="s-o-m-d-2-1-r">
                    <ul>
                      <li>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.28424 6.71301C5.48905 6.71301 5.69186 6.67267 5.88108 6.59429C6.0703 6.51591 6.24224 6.40103 6.38706 6.2562C6.53189 6.11138 6.64677 5.93945 6.72515 5.75022C6.80353 5.561 6.84387 5.35819 6.84387 5.15338C6.84387 4.94857 6.80353 4.74576 6.72515 4.55653C6.64677 4.36731 6.53189 4.19538 6.38706 4.05055C6.24224 3.90573 6.0703 3.79085 5.88108 3.71247C5.69186 3.63409 5.48905 3.59375 5.28424 3.59375C4.8706 3.59375 4.4739 3.75807 4.18141 4.05055C3.88893 4.34304 3.72461 4.73974 3.72461 5.15338C3.72461 5.56702 3.88893 5.96372 4.18141 6.2562C4.4739 6.54869 4.8706 6.71301 5.28424 6.71301Z" stroke="url(#paint0_linear_14_34174)" />
                          <path d="M1.09401 4.24423C2.07877 -0.0847405 8.49224 -0.0797416 9.47201 4.24923C10.0469 6.78862 8.46725 8.93811 7.08258 10.2678C6.59873 10.7344 5.95273 10.9952 5.28051 10.9952C4.60829 10.9952 3.96229 10.7344 3.47844 10.2678C2.09877 8.93811 0.519142 6.78362 1.09401 4.24423Z" stroke="url(#paint1_linear_14_34174)" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34174" x1="5.28424" y1="3.59375" x2="5.28424" y2="6.71301" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_14_34174" x1="5.283" y1="1" x2="5.283" y2="10.9952" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.shipmentaddress}
                      </li>
                      <li>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.9727 9.165C10.9727 9.345 10.9326 9.53 10.8475 9.71C10.7623 9.89 10.6522 10.06 10.507 10.22C10.2616 10.49 9.99118 10.685 9.68573 10.81C9.38528 10.935 9.05979 11 8.70926 11C8.1985 11 7.65268 10.88 7.07681 10.635C6.50095 10.39 5.92508 10.06 5.35423 9.645C4.77241 9.22005 4.22338 8.75207 3.71176 8.245C3.20539 7.736 2.73835 7.18944 2.31467 6.61C1.90405 6.04 1.57356 5.47 1.3332 4.905C1.09284 4.335 0.972656 3.79 0.972656 3.27C0.972656 2.93 1.03275 2.605 1.15293 2.305C1.27311 2 1.46339 1.72 1.72879 1.47C2.04927 1.155 2.3998 1 2.77035 1C2.91056 1 3.05077 1.03 3.17596 1.09C3.30616 1.15 3.42133 1.24 3.51146 1.37L4.67321 3.005C4.76334 3.13 4.82844 3.245 4.87351 3.355C4.91858 3.46 4.94361 3.565 4.94361 3.66C4.94361 3.78 4.90856 3.9 4.83846 4.015C4.77336 4.13 4.67821 4.25 4.55803 4.37L4.17746 4.765C4.12238 4.82 4.09734 4.885 4.09734 4.965C4.09734 5.005 4.10235 5.04 4.11237 5.08C4.12739 5.12 4.14241 5.15 4.15243 5.18C4.24256 5.345 4.39779 5.56 4.61812 5.82C4.84346 6.08 5.08382 6.345 5.34421 6.61C5.61462 6.875 5.87501 7.12 6.14041 7.345C6.4008 7.565 6.61612 7.715 6.78638 7.805C6.81141 7.815 6.84146 7.83 6.87651 7.845C6.91657 7.86 6.95663 7.865 7.0017 7.865C7.08683 7.865 7.15193 7.835 7.20701 7.78L7.58758 7.405C7.71277 7.28 7.83295 7.185 7.94812 7.125C8.06329 7.055 8.17846 7.02 8.30365 7.02C8.3988 7.02 8.49895 7.04 8.60911 7.085C8.71928 7.13 8.83445 7.195 8.95964 7.28L10.6171 8.455C10.7473 8.545 10.8375 8.65 10.8925 8.775C10.9426 8.9 10.9727 9.025 10.9727 9.165Z" stroke="url(#paint0_linear_14_34168)" stroke-miterlimit="10" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34168" x1="5.97266" y1="1" x2="5.97266" y2="11" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.phone}
                      </li>
                      <li>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.03561 6.28853C4.97599 6.28257 4.90445 6.28257 4.83887 6.28853C4.15458 6.2653 3.5062 5.97663 3.03104 5.48367C2.55588 4.9907 2.29125 4.33214 2.29319 3.64746C2.29319 2.18682 3.47362 1.00043 4.94022 1.00043C5.28744 0.994167 5.6325 1.05636 5.95569 1.18344C6.27888 1.31053 6.57387 1.50004 6.82382 1.74113C7.07377 1.98222 7.27379 2.27019 7.41245 2.58858C7.55111 2.90698 7.6257 3.24956 7.63197 3.59679C7.63823 3.94401 7.57604 4.28906 7.44895 4.61225C7.32186 4.93544 7.13236 5.23043 6.89127 5.48038C6.65017 5.73033 6.36221 5.93035 6.04382 6.06901C5.72542 6.20768 5.38283 6.28227 5.03561 6.28853ZM2.05472 8.48843C0.611968 9.45424 0.611968 11.0281 2.05472 11.988C3.69421 13.085 6.38297 13.085 8.02247 11.988C9.46522 11.0222 9.46522 9.44828 8.02247 8.48843C6.38894 7.39742 3.70017 7.39742 2.05472 8.48843Z" stroke="url(#paint0_linear_14_34171)" stroke-width="0.894267" strokeLinecap="round" stroke-linejoin="round" />
                          <defs>
                            <linearGradient id="paint0_linear_14_34171" x1="5.03859" y1="1" x2="5.03859" y2="12.8107" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#00C3C9" />
                              <stop offset="1" stop-color="#8B2CA0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {pendingOrderDetail?.name}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="s-o-m-d-3">
                <div className="s-o-m-d-3-l">
                  <h3>Delivery Details</h3>
                  <p>Est Delivery: Tue, <span>Dec 15</span> -Wed, <span>Dec 16</span></p>
                </div>
                <div className="s-o-m-d-3-r">
                  <div className="s-o-m-d-3-r-a">
                    <div className="s-o-m-d-3-r-a-l">
                      <div className="s-o-m-d-3-r-a-l-w" style={{ justifyContent: 'center' }}>Completed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="s-o-m-d-4" style={{ marginTop: review ? '30px' : '0px' }}>
                <div className="d-4-1">
                  {pendingOrderDetail?.products?.map((data, index) => {
                    return (
                      <div className="d-4-1-w" key={index}>
                        <div className="d-4-1-l">
                          <img src={data?.media?.[0]?.name} alt="Product" />
                        </div>
                        <div className="d-4-1-r">
                          <h4>{data?.name}</h4>
                          <div className="d-4-1-r-1">
                            <div className="d-4-1-r-1-l">
                              <h5>${data?.producttotal}</h5>
                              <p>Quantity :<span>{data?.quantity}</span></p>
                            </div>
                            <div className="d-4-1-r-1-r">
                              <ul>
                                {pendingOrderAttributes?.[index]?.map((data, i) => {
                                  return (
                                    <li key={i}>
                                      <p>{data?.key} : </p>
                                      <ul>
                                        <li>{data?.value}</li>
                                      </ul>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="d-4-1-e">
                          <form onSubmit={(e) => { customerOderReview(e, data?.id, index) }}>
                            <div className="review-star">
                              <span onClick={() => { setReviewStar((prev) => ({ ...prev, [`star${index}`]: 1 })) }}>{reviewStar[`star${index}`] > 0 ? <FaStar /> : <FaRegStar />}</span>
                              <span onClick={() => { setReviewStar((prev) => ({ ...prev, [`star${index}`]: 2 })) }}>{reviewStar[`star${index}`] > 1 ? <FaStar /> : <FaRegStar />}</span>
                              <span onClick={() => { setReviewStar((prev) => ({ ...prev, [`star${index}`]: 3 })) }}>{reviewStar[`star${index}`] > 2 ? <FaStar /> : <FaRegStar />}</span>
                              <span onClick={() => { setReviewStar((prev) => ({ ...prev, [`star${index}`]: 4 })) }}>{reviewStar[`star${index}`] > 3 ? <FaStar /> : <FaRegStar />}</span>
                              <span onClick={() => { setReviewStar((prev) => ({ ...prev, [`star${index}`]: 5 })) }}>{reviewStar[`star${index}`] > 4 ? <FaStar /> : <FaRegStar />}</span>
                            </div>
                            <textarea placeholder="Description..." onChange={(e) => { setdescription((prev) => ({ ...prev, [`description${index}`]: e.target.value })) }}></textarea>
                            {description[`description${index}`] === "" && inputError && selectedIndex === index && <p className="error-input">Description is required</p>}
                            <div className="review-s-b">
                              <button>Send</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <>
                  <div className="d-4-2">
                    <ul>
                      <li>
                        <ul>
                          <li>Subtotal ( {pendingOrderDetail?.products?.[0]?.quantity} item )</li>
                          <li>${pendingOrderDetail?.subtotal}</li>
                        </ul>
                        <ul>
                          <li>Shipping</li>
                          <li>${pendingOrderDetail?.shippingcost}</li>
                        </ul>
                        <ul>
                          <li>Discount</li>
                          <li>-$5.00</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="d-4-3">
                    <ul>
                      <li>
                        <ul>
                          <li>Order Total</li>
                          <li>${pendingOrderDetail?.ordertotal}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </>
              </div>
              <div className="s-o-m-d-11">
                <form onSubmit={reOrder}>
                  <button>Confirm Re-Order</button>
                </form>
              </div>
            </div>
        )
      }
    </div>
  );
};

export default CustomerCompleteOrder;
