import React from "react";

const sellersData = [
  { id: 1, name: "Seller 1", joinedSince: "2022-05-10", location: "New York" },
  // Add more seller objects as needed
];

const SellerAbout = () => {
  return (
    <>
      <div className="row">
        <h3>About us</h3>
        <p>
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham.
        </p>
      </div>
      <div className="seller-joining-details">
        {sellersData.map((seller) => (
          <div className="row" key={seller.id}>
            <ul>
              <li>Seller: <span>{seller.name}</span></li>
              <li>Joined Since: <span>{seller.joinedSince}</span></li>
              <li>Location: <span>{seller.location}</span></li>
            </ul>
          </div>
        ))}
      </div>
      <div className="row" style={{padding:"20PX 0PX"}}>
        <h3>Our Top Rated Seller</h3>
        <p>
        This book is a treatise on the theory of ethics, very popular during the Renaissance.<br />
        The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </p>
      </div>
    </>
  );
};

export default SellerAbout;
