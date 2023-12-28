import React, { useState } from 'react';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';
import Prdimage3 from '../../assets/Images/Singleproduct/Product3.png'
import Prdimage4 from '../../assets/Images/Singleproduct/product.png'
import Location from '../../assets/Images/map.png'
import icon1 from '../../assets/Images/icons/1.png'
import icon2 from '../../assets/Images/icons/2.png'
import icon3 from '../../assets/Images/icons/3.png'
import { Link } from 'react-router-dom';

// DetailedProductInfo component to display details of a single product
const DetailedProductInfo = ({ product }) => {
  // Modify this component to display detailed product information as per your needs
  return (
    <div className="detailed-product-info">
        <h3>Order Details</h3>
        <h4>Order #: {product.orderNumber}</h4>
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
                    <p><img src={icon1} /> {product.address}</p>
                    <p><img src={icon2} /> {product.phone}</p>
                    <p><img src={icon3} /> {product.name}</p>
                </div>
            </div>
        </div>
        <div className='row align-items-center deliverystatus'>
            <div className='col-lg-6'>
                <div className='deliverystatustime'>
                    <h3>Delivery Status</h3>
                    <p>Est Delivery: <span>{product.deliveryStatus}</span></p>
                </div>
            </div>
            <div className='col-lg-6'>
                <select>
                    <option>
                    Pending
                    </option>
                    <option>
                    Delivered
                    </option>
                    <option>
                    Refund
                    </option>
                </select>
            </div>
        </div>
        <div className='row align-items-center'>
            <h3>Order Items</h3>
            <div className='col-lg-9'>
            <div className='product-image'>
              <div className='image'>
                  <img  src={product.images}  />
              </div>
              <div className='prd-details'>
                <h5>{product.productName}</h5>
                <p>${product.price}</p>
                <p className='size-color'><span>Size:</span> {product.size} <span>Color:</span> {product.color}</p>
              </div>
            </div>
            </div>
            <div className='col-lg-3'>
                <h5 className='qunty'>Quantity :<span>{product.quantity}</span></h5>
            </div>
        </div>
        <div className='order-price-detail'>
            <p className='order-price-detail-list'>
                <div>Subtotal ( {product.item} item )</div>
                <div>{product.subTotal}$</div>
            </p>
            <p className='order-price-detail-list'>
                <div>Shipping</div>
                <div>{product.shipping}$</div>
            </p>
            <p className='order-price-detail-list'>
                <div>Discount</div>
                <div>{product.discount}$</div>
            </p>
            <p className='order-price-detail-list ordertotal'>
                <div>Order Total</div>
                <div>{product.orderTotal}$</div>
            </p>
        </div>
        <div className='not-order-detail'>
            <h3>Note</h3>
            <div className='ord-note'>
                <p>{product.note}</p>
            </div>
        </div>
        <Link style={{textDecoration: "unset"}}><button className='updteordr'>Updated Order</button></Link>
    </div>
  );
};

const OngoingOrderManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (index) => {
    setSelectedProduct(index);
  };

  const ordersData = [
    {
      orderNumber: '312323',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #12121",
      images: [
        Prdimage,
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
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
       orderNumber: '53535',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #3131",
      images: [
        Prdimage1,
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
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        orderNumber: '414324',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #42424",
      images: [
        Prdimage2,
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
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        orderNumber: '636363',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #52525",
      images: [
        Prdimage3,
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
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    

  ];

  if (selectedProduct !== null && ordersData[selectedProduct]) {
    const selectedOrder = ordersData[selectedProduct];

    return (
      <div className='detailed-view'>
        <DetailedProductInfo product={selectedOrder} />
        <button className='bckkkkk' onClick={() => setSelectedProduct(null)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className='ongoing ordmangemnt'>
      <h3>Ongoing Orders</h3>
      {ordersData.map((order, index) => (
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
                <h6 style={{ color: "#0688FF" }}>{order.status}</h6>
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
        
      ))}
    </div>
  );
};

export default OngoingOrderManagement;
