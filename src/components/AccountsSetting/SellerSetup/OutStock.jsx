import React, { useEffect, useState } from 'react';
import SellerProductImage2 from "../../../assets/Images/Categorylisting/2.png";
import icon1 from "../../../assets/Images/icons/1.png";
import icon2 from "../../../assets/Images/icons/2.png";
import icon3 from "../../../assets/Images/icons/3.png";
import Backimage from '../../../assets/Images/back-icon.png'
import Location from "../../../assets/Images/map.png";
import StockServices from "../../../services/API/StockServices"; //~/services/API/StockServices
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';
import moment from "moment";
import SellerAllTabs from '../SellerSetup/SellerAllTabs';

const OutStock = () => {
  const [stock, setStock] = useState("");
  const getStock =() =>{
    StockServices.stockOut()
    .then((response) => {
       setStock(response.data);
    });
  }
  useEffect(() => {
    getStock();
  }, []);
  return (
    <>
      <section id='activity-main-dashboard'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="main-content">
            <section id='searchhistory'>
                <div className='row'>
                  <div className='title-buton'>
                    <div>
                      <h3>Out of Stock</h3>
                    </div>
                  </div>
                </div>
                <br />
                <div className='row'>
                   {stock?.length > 0 ?(<>
                    {stock.map((item, index) => {
                        const attributes = JSON.parse(item.attributes);
                      return(
                        <>
                          <div className='historylist' key={index}>
                        <div className='list-inline'>
                          <div>
                            <img src={Prdimage1} width="150" height="150" alt='Search Icon' />
                          </div>
                          <div  className="detaildashbritemdetail">
                          <h4>Name: {item.name}</h4>
                              {/* <Link to='/category'>
                            </Link> */}
                          <p>Price: $ {item.price}</p>
                          <br />
                          <h4>Attributes:</h4>
                            {attributes?.length > 0 ? (
                              <>
                              
                                {attributes.map((attribute , index) => {
                                  return(
                                    <>
                                      <ul key={index}>
                                        <li>Size: {attribute.size}</li>
                                        <li>Color Available: {attribute.color}</li>
                                        <li>Quantity Available: {attribute.quantity}</li>
                                      </ul>
                                    </>
                                  )
                                })}
                              </>
                            ):('')}
                          </div>
                          <div className="dropdown">
                              <a
                                href={`singleproduct/${item.guid}`}
                                target='_blank'
                              >
                                {/* <Link to={`/completedorder/${summary.order.orderid}`}> */}
                                View Detail
                              </a>
                              {/* </Link> */}
                            </div>
                        </div>
                        <hr />
                      </div>
                        </>
                      )
                    })}
                   </>):('No Stock')}
                </div>
              </section>
            {/* <button className='backbutton-account' onClick={() => window.history.back()}><img src={Backimage} /> Back</button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OutStock;
