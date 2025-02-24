import React, { useEffect, useState } from 'react';
import ProductServices from "../../../services/API/ProductServices";
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';

const MyProducts = () => {
  const [products, setProducts] = useState({});
  const [trustedseller, setTrustedSeller] = useState(0);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user_details'));
    if (user.isTrustedSeller) {
      setTrustedSeller(1);
    }
    ProductServices.self()
      .then((response) => {
        setProducts(response);
      });
  }, []);
  return (
    <>
      {trustedseller ? (
        <>
          <section id='activity-main-dashboard'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="main-content">
                  <section id='searchhistory'>
                    <div className='row'>
                      <div className='title-buton'>
                        <div>
                          <h3>Items Listing</h3>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className='row'>
                      {products?.length > 0 ? (
                        <>
                          {products.map((item, index) => {
                            const attributes = JSON.parse(item.attributes);
                            return (
                                <div className='historylist' key={index}>
                                  <div className='list-inline'>
                                    <div>
                                      <img src={Prdimage1} width="150" height="150" alt='Search Icon' />
                                    </div>
                                    <div className="detaildashbritemdetail">
                                      <h4>Name: {item.name}</h4>
                                      <p>Price: $ {item.price}</p>
                                      <br />
                                      <h4>Attributes:</h4>
                                      {attributes?.length > 0 ? (
                                        <>

                                          {attributes.map((attribute , index) => {
                                            return (
                                                <ul key={index}>
                                                  <li>Size: {attribute.size}</li>
                                                  <li>Color Available: <span style={{ width: "30px", backgroundColor: attribute.color, color: attribute.color, border: `1px solid #000` }}>Available Colors</span></li>
                                                  <li>Quantity Available: {attribute.quantity}</li>
                                                </ul>
                                            )
                                          })}
                                        </>
                                      ) : ('')}
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
                            )
                          })}
                        </>
                      ) : ('No items')}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <p>Your Store has not yet Been Registered!</p>
        </>
      )}
    </>
  );
};

export default MyProducts;
