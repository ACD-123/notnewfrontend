import React from 'react';
import { Link } from 'react-router-dom';
import blank from '../../assets/Images/Productcard/blank.jpg';

const ProductCard = ({ productData }) => {
  return (
    <div className="col col-lg-3" key={productData.guid}>
      <div className="productlist">
        {productData.auctioned == 1 ? (
          <Link to={`/auctionproduct/${productData.guid}`}>
            {productData.media.length === 0 ? (
              <img src={blank} alt="blank" />
            ) : (
              <>
                {productData.media.map((media, index) => {
                  if (index === 0) {
                    return (
                      <Link to={`/singleproduct/${productData.guid}`} key={index}>
                        <img style={{objectFit:'contain',width:'100%'}} src={media.name} alt={productData.name} />
                      </Link>
                    );
                  }
                })}
              </>
            )}
          </Link>
        ) : (
          <>
            {productData.media.length === 0 ? (
              <img src={blank} alt="blank" />
            ) : (
              <>
                {productData.media.map((media, index) => {
                  if (index === 0) {
                    return (
                      <Link to={`/singleproduct/${productData.guid}`} key={index}>
                        <img style={{objectFit:'contain',width:'100%'}} src={media.name} alt={productData.name} />
                      </Link>
                    );
                  }
                })}
              </>
            )}
          </>
        )}
        {productData.auctioned ? <span className="auction-badge">Auction</span> : ''}
        <div className="px-2">
          {productData.auctioned ? (
            <Link to={`/auctionproduct/${productData.guid}`}>
              <h3>{productData.name.substring(0, 6)}...</h3>
              <h4>{productData.description.substring(0, 8)}...</h4>
            </Link>
          ) : (
            <Link to={`/singleproduct/${productData.guid}`}>
              <h3>{productData.name.substring(0, 6)}...</h3>
              <h4>{productData.description.substring(0, 8)}...</h4>
            </Link>
          )}
          <p>
            <b>Condition:</b> <br />
            {productData.condition}
          </p>
          <p>
            {productData.auctioned ? (
              <>
                <ul>
                  <li className="sale">
                    <p>
                      <b>Bids: </b>$ {productData.bids}
                    </p>
                  </li>
                  {(productData.price !== null && productData.sale_price !== null) ||
                  productData.sale_price !== 0 ? (
                    <li className="sale">
                      <del>${productData.price}</del>
                    </li>
                  ) : null}
                  {(productData.price !== null && productData.sale_price !== null) ||
                  productData.sale_price !== 0 ? (
                    <li className="discount">
                      {(((productData.price - productData.sale_price) / productData.price) * 100).toFixed(2)}
                      % OFF
                    </li>
                  ) : null}
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li className="sale">
                    <p>
                      <b>Price: </b>$ {productData.price}
                    </p>
                  </li>
                  {(productData.price !== null && productData.sale_price !== null) ||
                  productData.sale_price !== 0 ? (
                    <li className="sale">
                      <del>${productData.price}</del>
                    </li>
                  ) : null}
                  {(productData.price !== null && productData.sale_price !== null) ||
                  productData.sale_price !== 0 ? (
                    <li className="discount">
                      {(((productData.price - productData.sale_price) / productData.price) * 100).toFixed(2)}
                      % OFF
                    </li>
                  ) : null}
                </ul>
              </>
            )}
            <ul></ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
