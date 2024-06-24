import React, { useState, useEffect } from 'react';
import Prdimage from '../../../assets/Images/Seller/Refundimages/1.png';
import Prdimage1 from '../../../assets/Images/Seller/Refundimages/2.png';
import Prdimage2 from '../../../assets/Images/Seller/Refundimages/3.png';
import Prdimage3 from '../../../assets/Images/Seller/Refundimages/4.png'
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import BidsServices from "../../../services/API/BidsServices"; //~/services/API/BidsServices
import { BASE_URL } from "../../../services/Constant";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import Location from '../../../assets/Images/map.png'
import icon1 from '../../../assets/Images/icons/1.png'
import icon2 from '../../../assets/Images/icons/2.png'
import icon3 from '../../../assets/Images/icons/3.png'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

// DetailedProductInfo component to display details of a single product
const DetailedProductInfo = ({ bid, product }) => {
  // console.log('bid', bid)
  const handleAccept = (e, id, proId) => {
    e.preventDefault();
    let data = {
      'user_id': id,
      'product_id': proId
    }
    BidsServices.acceptBids(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.data)
        }
      })

  }
  const handleReject = (e, id, proId) => {
    e.preventDefault();
    let data = {
      'user_id': id,
      'product_id': proId
    }
    BidsServices.rejectBids(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.data)
        }
      })

  }
  // Modify this component to display detailed product information as per your needs
  return (
    <>
      {bid.length > 0 ? (
        <>
          <div className='detaild-product-infi'>
            <h3>Auction Details</h3>

            <div className='row align-items-center'>
              <div className='col-lg-4'>
                <div className='prd-imgg'>
                  <div><img src={`${BASE_URL}/image/product/${bid[0].product.media[0].name}`} alt={bid[0].product.media[0].name} /></div>
                </div>
              </div>
              <div className='col-lg-8'>
                <h5>{bid[0].product.name}</h5>
                <div className='bidders-results'>
                  <div>Ends In <br />
                    {bid[0].endsIn}
                    {/* {product.bidEnd} */}
                  </div>
                  <div>Current Bid <br /> $ {bid[0].currentbid.max_bids}
                    {/* {product.currentBid} */}
                  </div>
                  <div>Total Bids <br /> {bid[0].bidsno}</div>
                </div>
              </div>
            </div>
            {/* End Row */}
            <div className='row biddata'>
              <table>
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Bidders</th>
                    <th>Bids</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bid[0].totalbids.length > 0 ? (
                    <>
                      {bid[0].totalbids?.map((bid, index) => {
                        let sno = 1;
                        console.log('bid product', bid)
                        return (
                          <tr key={index}>
                            <td>
                              {sno++}
                              {/* {bid.serialNo} */}
                            </td>
                            <td>
                              {bid.user?.email}
                              {/* {bid.email}  */}
                              <br />
                              {/* {bid.time} */}
                              {bid.time_bids}
                            </td>
                            <td>$ {bid.max_bids}</td>
                            <td>
                              <a href="#" onClick={(e) => handleAccept(e, bid.user?.id, bid.product?.id)} style={{ color: "green" }}>Accept</a>
                              |
                              <a href="#" onClick={(e) => handleReject(e, bid.user?.id, bid.product?.id)} style={{ color: "red" }}>Reject</a>
                            </td>
                          </tr>
                        )
                      })}

                    </>
                  ) : (
                    <>
                    </>
                  )}
                  {/* {product.bidData.slice(0, 5).map((bid, index) => (
        <tr key={index}>
          <td>{bid.serialNo}</td>
          <td>{bid.email} <br /> {bid.time}pm</td>
          <td>${bid.bidPrice}</td>
        </tr>
      ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <div className='detaild-product-infi'>
      <h3>Auction Details</h3>
      
      <div className='row align-items-center'>
        <div className='col-lg-4'>
          <div className='prd-imgg'>
            <div><img  src={product.images}  /></div>
          </div>
        </div>
        <div className='col-lg-8'>
        <h5>{product.productName}</h5>
        <div className='bidders-results'>
          <div>Ends In <br />{product.bidEnd}</div>
          <div>Current Bid <br /> ${product.currentBid}</div>
          <div>Total Bids <br /> ${product.totalBid}</div>
        </div>
        </div>
      </div>
      <div className='row biddata'>
        <table>
          <thead>
          <tr>
            <th>S.no</th>
            <th>Bidders</th>
            <th>Bids</th>
          </tr>
          </thead>
          <tbody>
          {product.bidData.slice(0, 5).map((bid, index) => (
        <tr key={index}>
          <td>{bid.serialNo}</td>
          <td>{bid.email} <br /> {bid.time}pm</td>
          <td>${bid.bidPrice}</td>
        </tr>
      ))}
          </tbody>
        </table>
      </div>
    </div> */}
    </>
  );
};

const BidsNoffers = () => {
  let loggedInUser = JSON.parse(localStorage.getItem('user_details'));
  const [activeTab, setActiveTab] = useState('rr1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (index, order) => {
    console.log('current  bid order', order)
    setSelectedProduct(index);
  };

  const ordersData = [
    {
      orderNumber: '312323',
      productName: "Sole Story: Step into Style",
      images: [
        Prdimage,
      ],
      bidData: [
        {
          serialNo: '01',
          email: 'bidders1@gmail.com',
          time: '13:23',
          bidPrice: '12.00',
        },
        {
          serialNo: '02',
          email: 'bidders2@gmail.com',
          time: '51:23',
          bidPrice: '52.00',
        },
        {
          serialNo: '03',
          email: 'bidders3@gmail.com',
          time: '52:21',
          bidPrice: '99.00',
        }
      ],
      status: 'Pending',
      address: '2438 6th Ave, Ketchikan, Alaska 99901, USA',
      phone: '02184548845',
      name: 'Slim Shady',
      deliveryStatus: 'Tue, Dec 15 -Wed, Dec 16',
      price: '38.00',
      quantity: '3',
      size: '2.9',
      color: 'Red, GREEN',
      subTotal: '58.88',
      item: '2',
      shipping: '56.00',
      discount: '-30',
      orderTotal: '98.00',
      bids: '16',
      bidEnd: '18:32:24',
      currentBid: '32',
      totalBid: '33.00',
      paymentStatus: 'Paid',
      bidStatus: 'Lost',
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
      orderNumber: '53535',
      productName: "Footwear Fusion: Find Your Perfect Fit",
      images: [
        Prdimage1,
      ],
      bidData: [
        {
          serialNo: '01',
          email: 'bidders1@gmail.com',
          time: '13:23',
          bidPrice: '12.00',
        },
        {
          serialNo: '02',
          email: 'bidders2@gmail.com',
          time: '51:23',
          bidPrice: '52.00',
        },
        {
          serialNo: '03',
          email: 'bidders3@gmail.com',
          time: '52:21',
          bidPrice: '99.00',
        }
      ],
      status: 'Pending',
      address: '2438 6th Ave, Ketchikan, Alaska 99901, USA',
      phone: '02184548845',
      name: 'Slim Shady',
      deliveryStatus: 'Tue, Dec 15 -Wed, Dec 16',
      price: '38.00',
      quantity: '3',
      size: '2.9',
      color: 'Red, GREEN',
      subTotal: '58.88',
      item: '2',
      shipping: '56.00',
      discount: '-30',
      orderTotal: '98.00',
      bids: '23',
      bidEnd: '16:23:12',
      currentBid: '98',
      totalBid: '23.00',
      paymentStatus: 'Unpaid',
      bidStatus: 'Winner',
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
      orderNumber: '414324',
      productName: "Walk This Way: Shoe Chic Collection",
      images: [
        Prdimage2,
      ],
      bidData: [
        {
          serialNo: '01',
          email: 'bidders1@gmail.com',
          time: '13:23',
          bidPrice: '12.00',
        },
        {
          serialNo: '02',
          email: 'bidders2@gmail.com',
          time: '51:23',
          bidPrice: '52.00',
        },
        {
          serialNo: '03',
          email: 'bidders3@gmail.com',
          time: '52:21',
          bidPrice: '99.00',
        }
      ],
      status: 'Pending',
      address: '2438 6th Ave, Ketchikan, Alaska 99901, USA',
      phone: '02184548845',
      name: 'Slim Shady',
      deliveryStatus: 'Tue, Dec 12 -Wed, Dec 16',
      price: '38.00',
      quantity: '3',
      size: '2.9',
      color: 'Red, White',
      subTotal: '58.88',
      item: '2',
      shipping: '56.00',
      discount: '-30',
      orderTotal: '98.00',
      bids: '51',
      bidEnd: '12:42:56',
      currentBid: '48',
      totalBid: '44.00',
      paymentStatus: 'Unpaid',
      bidStatus: 'Winner',
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
      orderNumber: '636363',
      productName: "Stride Elegance: Your Ultimate Shoe Haven",
      images: [
        Prdimage3,
      ],
      bidData: [
        {
          serialNo: '01',
          email: 'bidders1@gmail.com',
          time: '13:23',
          bidPrice: '12.00',
        },
        {
          serialNo: '02',
          email: 'bidders2@gmail.com',
          time: '51:23',
          bidPrice: '52.00',
        },
        {
          serialNo: '03',
          email: 'bidders3@gmail.com',
          time: '52:21',
          bidPrice: '99.00',
        }
      ],
      status: 'Pending',
      address: '2438 6th Ave, Ketchikan, Alaska 99901, USA',
      phone: '02184548845',
      name: 'John Doe',
      deliveryStatus: 'Tue, Dec 23 -Wed, Dec 16',
      price: '38.00',
      quantity: '3',
      size: '2.9',
      color: 'Red, Black',
      subTotal: '58.88',
      item: '2',
      shipping: '56.00',
      discount: '-30',
      orderTotal: '98.00',
      bids: '12',
      bidEnd: '14:22:56',
      currentBid: '22',
      totalBid: '66.00',
      paymentStatus: 'Paid',
      bidStatus: 'Lost',
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },


  ];
  const [biddata, setBidData] = useState([]);

  const getSellerBid = () => {
    UserServices.getSellerActiveBid(loggedInUser?.id)
      .then((response) => {
        console.log(response.data, 'active');
        if (response.status) {
          setBidData(response.data)
        }
      }).catch((error) => {

      })
  }
  useEffect(() => {
    getSellerBid();
  }, []);

  if (selectedProduct !== null && ordersData[selectedProduct]) {
    const selectedOrder = ordersData[selectedProduct];
    return (
      <div className='detailed-view'>
        <DetailedProductInfo bid={biddata} product={selectedOrder} />
        <button className='bckkkkk' onClick={() => setSelectedProduct(null)}>Go Back</button>
      </div>
    );
  }
  return (
    <>
      <h3>Bids & Offers</h3>
      <div className='bid-offer-tabs'>

        <div className="tab-buttons">
          <button onClick={() => handleTabClick('rr1')} className={activeTab === 'rr1' ? 'active' : ''}>
            Active auctions
          </button>
          <button onClick={() => handleTabClick('rr2')} className={activeTab === 'rr2' ? 'active' : ''}>
            Ended auctions
          </button>

        </div>
        <div className="tab-content">
          {activeTab === 'rr1' &&
            <div>
              <div className='ongoing ordmangemnt'>
                {biddata.length > 0 ? (
                  <>
                    {biddata?.active.map((order, index) => {
                      let images = [];
                      order.product?.media.forEach((media) => {
                        images.push(media)
                      });
                      return (
                        <>
                          <div className='row align-items-center' key={index}>
                            <div className='col-lg-8'>
                              <div className='product-image'>
                                {images.length > 0 ? (
                                  <>
                                    <div className='image'>
                                      {images.map((image, imgIndex) => {
                                        if (imgIndex == 0) {
                                          return (
                                            <>
                                              <img key={imgIndex} src={`${BASE_URL}/image/product/${image.name}`} alt={image.name} />
                                            </>
                                            // 
                                          )
                                        }
                                      })}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <img src={blank} alt='blank' width="150" height="150" />
                                  </>
                                )}
                                <div className='prd-details'>
                                  {/* <h5>Order # : <b>{order.orderNumber}</b></h5> */}
                                  <h3>{order.product.name}</h3>
                                  <h6 style={{ fontWeight: "Bold", color: "#000" }}>Current Bid: $ 98</h6>
                                  <div className='bids-prd'>
                                    <div>{order.currentbid.max_bids} bids</div>
                                    <div style={{ color: "red" }}>Ends in 16:23:12</div>
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div className='col-lg-4'>
                              <div className='rightarrow viedeails'>
                                <button onClick={() => handleViewDetails(index, order)}>
                                  View Details
                                </button>
                              </div>
                            </div>
                            <hr />
                          </div>
                        </>
                      )
                    })}
                  </>
                ) : (
                  <>
                    No Bids Exists!
                  </>
                )}
                {/* {ordersData.map((order, index) => (
        <div className='row align-items-center' key={order.orderNumber}>
          <div className='col-lg-8'>
            <div className='product-image'>
              <div className='image'>
                {order.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={`Product ${imgIndex + 1}`} />
                ))}
              </div>
              <div className='prd-details'>
                <h5>Order # : <b>{order.orderNumber}</b></h5>
                <h3>{order.productName}</h3>
                <h6 style={{fontWeight: "Bold", color: "#000"}}>Current Bid: ${order.currentBid}</h6>
                <div className='bids-prd'>
                <div>{order.bids} bids</div>
                <div style={{color: "red"}}>Ends in {order.bidEnd}</div>
                </div>
              </div>
            </div>
            
          </div>

          <div className='col-lg-4'>
            <div className='rightarrow viedeails'>
              <button onClick={() => handleViewDetails(index)}>
                View Details
              </button>
            </div>
          </div>
          <hr />
        </div>
        
      ))} */}
              </div></div>}
          {activeTab === 'rr2' && <div><div className='ongoing ordmangemnt'>
            {biddata.length > 0 ? (
              <>
                {biddata?.inactive.map((order, index) => {
                  let images = [];
                  order.product?.media.forEach((media) => {
                    images.push(media)
                  });
                  return (
                    <>
                      <div className='row align-items-center' key={index}>
                        <div className='col-lg-8'>
                          <div className='product-image'>
                            {images.length > 0 ? (
                              <>
                                <div className='image'>
                                  {images.map((image, imgIndex) => {
                                    if (imgIndex == 0) {
                                      return (
                                        <>
                                          <img key={imgIndex} src={`${BASE_URL}/image/product/${image.name}`} alt={image.name} />
                                        </>
                                        // 
                                      )
                                    }
                                  })}
                                </div>
                              </>
                            ) : (
                              <>
                                <img src={blank} alt='blank' width="150" height="150" />
                              </>
                            )}
                            <div className='prd-details'>
                              {/* <h5>Order # : <b>{order.orderNumber}</b></h5> */}
                              <h3>{order.product.name}</h3>
                              <h6 style={{ fontWeight: "Bold", color: "#000" }}>Current Bid: $ 98</h6>
                              <div className='bids-prd'>
                                <div>{order.currentbid.max_bids} bids</div>
                                <div style={{ color: "red" }}>Ends in 16:23:12</div>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className='col-lg-4'>
                          <div className='paymentstatus'>
                            <h5>
                              Status <br /> <span style={{
                                color:
                                  order.currentbid.status === "Unpaid"
                                    ? "#B01212"
                                    : order.currentbid.status === "Paid"
                                      ? "green"
                                      : order.currentbid.status === "pending"
                                        ? "orange"
                                        : "black",
                              }}>{order.currentbid.status}</span>
                            </h5>
                          </div>
                        </div>
                        {/* <div className='col-lg-4'>
                  <div className='rightarrow viedeails'>
                    <button onClick={() => handleViewDetails(index)}>
                      View Details
                    </button>
                  </div>
                </div> */}
                        <hr />
                      </div>
                    </>
                  )
                })}
              </>
            ) : (
              <>
                No Bids Exists!
              </>
            )}
            {ordersData.map((order, index) => (
              <div className='row align-items-center' key={order.orderNumber}>
                <div className='col-lg-10'>
                  <div className='product-image'>
                    <div className='image'>
                      {order.images.map((image, imgIndex) => (
                        <img key={imgIndex} src={image} alt={`Product ${imgIndex + 1}`} />
                      ))}
                    </div>
                    <div className='prd-details'>
                      <h5>Order # : <b>{order.orderNumber}</b></h5>
                      <h3>{order.productName}</h3>
                      <h6 style={{ fontWeight: "Bold", color: "#000" }}>Current Bid: ${order.currentBid}</h6>
                      <h4 style={{
                        color:
                          order.bidStatus === "Winner"
                            ? "#8b2ca0"
                            : order.bidStatus === "Lost"
                              ? "green"
                              : "black", fontWeight: "bold"
                      }}>{order.bidStatus}</h4>
                    </div>
                  </div>

                </div>

                <div className='col-lg-2'>
                  <div className='paymentstatus'>
                    <h5>
                      Status <br /> <span style={{
                        color:
                          order.paymentStatus === "Unpaid"
                            ? "#B01212"
                            : order.paymentStatus === "Paid"
                              ? "green"
                              : "black",
                      }}>{order.paymentStatus}</span>
                    </h5>
                  </div>
                </div>
                <hr />
              </div>

            ))}
          </div></div>}

        </div>
      </div>

    </>
  );
};

export default BidsNoffers;
