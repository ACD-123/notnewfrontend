import React, { useEffect, useState } from 'react';
import StockServices from "../../../services/API/StockServices";
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';

const InStock = () => {
  const [stock, setStock] = useState("");
  const getStock =() =>{
    StockServices.stockIn()
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
                      <h3>In Stock</h3>
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
                                View Detail
                              </a>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InStock;
