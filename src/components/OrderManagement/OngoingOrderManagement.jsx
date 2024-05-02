import React, { useState, useEffect } from 'react';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';
import Prdimage3 from '../../assets/Images/icons/active.png'
import Prdimage4 from '../../assets/Images/Singleproduct/product.png'
import Location from '../../assets/Images/map.png'
import icon1 from '../../assets/Images/icons/1.png'
import icon2 from '../../assets/Images/icons/2.png'
import icon3 from '../../assets/Images/icons/3.png'
import { Link } from 'react-router-dom';
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import { toast } from "react-toastify";

// DetailedProductInfo component to display details of a single order
const DetailedProductInfo = ({ order }) => {
  const [singleOrder, setOrder] = useState({});
  const [singleOrderItems, setOrderItems] = useState({});
  const [formData, setFormData] = useState({
    estimateDelivery: "",
    shipping_cost: "0",
    discountcode: "",
    status: "",
    orderid: ""
  });
const orderId = order.id;

const getOrder = (orderId) => {
  OrderServices.getbyid(orderId) // Pass orderId instead of order
    .then((response) => {
      let orderItems = JSON.parse(JSON.parse(response.orderItems));
      console.log('ordersById', response);
      setOrder(response);
      setOrderItems(orderItems);
    })
    .catch((e) => {
      toast.error(e.message);
    });
};

const handleSubmit = (e) => {
  e.preventDefault();
  OrderServices.updateSeller(order.id, formData) // Use order.id directly
    .then((response) => {
      console.log('orderId', response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response);
      }
    })
    .catch((e) => {
      toast.error(e.message);
    });
};

  const handleInputChange =(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);
  // Modify this component to display detailed order information as per your needs
  return (
    <>
    {singleOrder ? (<>
      <div className="detailed-product-info">
        <form onSubmit={handleSubmit}>
        <h3>Order Details</h3>
        <h4>Order #: {singleOrder.orderid}</h4>
        <div className='row'>
            <div className='col-lg-8'>
                <div className='location'>
                    <img style={{width: "100%"}} src={Location} />
                </div>
            </div>
            <div className='col-lg-4'
             style={{border: "2.15px solid #E9E9E9", background: "#FCFCFC"}}
            >
                <div className='order-seller-details'>
                    <p><img src={icon1} /> {singleOrder.billing_address}</p>
                    {singleOrder.buyer ? (<>
                      <p><img src={icon2} /> {singleOrder.buyer.phone}</p>
                    <p><img src={icon3} /> {singleOrder.buyer.name}</p>
                    </>):('')}
                </div>
            </div>
        </div>
        <div className='row align-items-center deliverystatus'>
            <div className='col-lg-6'>
                <div className='deliverystatustime'>
                    <h3>Delivery Status</h3>
                    <p>Est Delivery: <span><input type="text" onChange={handleInputChange} value={formData.estimateDelivery} name="estimateDelivery" id="estimateDelivery" /></span></p>
                    {/* <p>Est Delivery: <span></span></p> */}
                </div>
            </div>
            <div className='col-lg-6'>
                <select name="status" onChange={handleInputChange} value={formData.status}>
                    <option value="pending">
                    Pending
                    </option>
                    <option value="delivered">
                    Delivered
                    </option>
                    <option value="refund">
                    Refund
                    </option>
                </select>
            </div>
        </div>
        <div className='row align-items-center'>
            <h3>Order Items</h3>
            {singleOrderItems.length > 0 ?(
              <>  
                {singleOrderItems.map((item) => {
                  const attruibutes = JSON.parse(item.attributes);
                  return(
                    <>
                    <div className='col-lg-9'>
                      <div className='product-image'>
                        <div className='image'>
                            <img  src={Prdimage2}  />
                            {/* singleOrderItems */}
                        </div>
                      </div>
                      <div className='prd-details'>
                      <h5>{item.name}</h5>
                      <p>$ {item.price}</p>
                      <p className='size-color'>
                        {attruibutes.length > 0 ?(
                          <>
                          {attruibutes.map((attruibute) => {
                            // console.log('attruibutes', attruibute)
                            return(
                              <>
                                <span>Size:</span> {attruibute.size} <span>Color:</span> <div style={{ background: attruibute.color, width: "30px" }}>&nbsp;</div>
                              </>
                            )
                          })}
                          </>
                        ):('')}
                        {/* <span>Size:</span> {product.size} <span>Color:</span> {product.color} */}
                      </p>
                      
                      {/* <p className='size-color'><span>Size:</span> {product.size} <span>Color:</span> {product.color}</p> */}
                      </div>
                    </div>
                    </>
                  )
                })}
              </>
            ):('')}
            {/* <div className='col-lg-9'>
            <div className='product-image'>
              <div className='image'> */}
                  {/* <img  src={order.images}  /> */}
                  {/* <img  src={Prdimage2}  /> */}
                  {/* singleOrderItems */}
              {/* </div>
              <div className='prd-details'> */}
                {/* <h5>{product.productName}</h5>
                <p>${product.price}</p>
                <p className='size-color'><span>Size:</span> {product.size} <span>Color:</span> {product.color}</p> */}
              {/* </div>
            </div>
            </div> */}
            {/* <div className='col-lg-3'> */}
                {/* <h5 className='qunty'>Quantity :<span>{product.quantity}</span></h5> */}
            {/* </div> */}
        </div>
        <div className='order-price-detail'>
            <p className='order-price-detail-list'>
                <div>Subtotal ( {singleOrderItems.length} item )</div>
                <div>$ {singleOrder.subtotal_cost}</div>
                {/* <div>Subtotal ( {product.item} item )</div>
                <div>{product.subTotal}$</div> */}
            </p>
            <p className='order-price-detail-list'>
                <div>Shipping</div>
                <div>$ <input type='text'  value={formData.shipping_cost} onChange={handleInputChange} name="shipping_cost" /></div>
            </p>
            <p className='order-price-detail-list'>
                 <div>Discount Code</div>
                 <div><input type='text' value={formData.discountcode} name="discountcode" onChange={handleInputChange} /></div>
                {/* <div>{product.discount}$</div> */}
            </p>
            <p className='order-price-detail-list ordertotal'>
                <div>Order Total</div>
                <div>${singleOrder.order_total}</div>
            </p>
        </div>
        <div className='not-order-detail'>
            <h3>Note</h3>
            <div className='col-lg-9'>
              <textarea className='ord-note col-lg-12' name="admin_notes" onChange={handleInputChange}>{singleOrder.admin_notes}</textarea>
                {/* <p>{product.note}</p> */}
            </div>
        </div>
        <button type="submit" className='updteordr'>Updated Order</button>
        <input type="hidden" value={singleOrder.id} name="orderid" id="orderid" />
          {/* <Link style={{textDecoration: "unset"}}><button type="submit" className='updteordr'>Updated Order</button></Link> */}
        </form>
    </div>
    </>):('')}
    </>
  );
};

const OngoingOrderManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ordersummary, setOrderSummary] = useState({});

  const handleViewDetails = (order) => {
    setSelectedProduct(order);
  };
  const getOrderSummary = () => {
    OrderServices.sellerOngoingOrders()
      .then((response) => {
        console.log('orders',response);
        setOrderSummary(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    getOrderSummary();
  }, []);

  // if (selectedProduct !== null && ordersData[selectedProduct]) {
    if (selectedProduct !== null) {
    const selectedOrder = selectedProduct//ordersData[selectedProduct];
    // const selectedOrder = ordersData[selectedProduct];
    return (
      <div className='detailed-view'>
        <DetailedProductInfo order={selectedOrder} />
        <button className='bckkkkk' onClick={() => setSelectedProduct(null)}>Go Back</button>
      </div>
    );
  }
  
  return (
    <div className='ongoing ordmangemnt'>
      <h3>Ongoing Orders</h3>
      
  {ordersummary && ordersummary.data && ordersummary.data.map((order, index) => (
            <>
             <div className='row align-items-center' key={index}>
              <div className='col-lg-8'>
                <div className='product-image'>
                  <div className='image'>
                      <img  src={Prdimage3} alt="Product" />
                  </div>
                  <div className='prd-details'>
                    <h5>Order # : <b>{order.orderid}</b></h5>
                    <h3>{order.fullname}</h3>
                    <h6 style={{ color: "#0688FF" }}>{order.status}</h6>
                  </div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='rightarrow viedeails'>
                <button onClick={() => handleViewDetails(order)}>
  View Details
</button>
                </div>
              </div>
              <hr />
             </div>
            </>

        ))}
      
     
    </div>
  );
};

export default OngoingOrderManagement;
