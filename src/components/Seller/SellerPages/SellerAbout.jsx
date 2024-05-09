import React, { useEffect, useState } from "react";
import SellerServices from "../../../services/API/SellerServices";
import { Spinner } from "react-bootstrap";

const sellersData = [
  { id: 1, name: "Seller 1", joinedSince: "2022-05-10", location: "New York" },
  // Add more seller objects as needed
];

const SellerAbout = () => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = window.location;
  const id = pathname.split("/").pop();


  const getAbout = () => {
    SellerServices.getShopDetailAbout(id)
      .then((res) => {
        console.log('About',res.data);
        setDetails(res.data);
        setIsLoading(false);
        // let tags = JSON.parse(res.data.tags);
        // let allTags = [];
        // {
        //   tags.map((tag, index) => allTags.push(tag.tag));
        // }
        // setTags(allTags);
      })
      .finally(() => {
        // Set isLoading to false once data fetching is complete
        setIsLoading(false);
      });
  };
  // Mock data for products (replace this with your actual data)
  useEffect(() => {
    getAbout();
    // getTrending();
  }, []);
  return (
    <>
    {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <>
      <div className="row">
        <h3>About us</h3>
        <p>
          {details.description}
        </p>
        <br/>
        <h3>Email</h3>
        <p>
          {details.email}
        </p>
      </div>
      <div className="seller-joining-details">
        {/* {sellersData.map((seller) => ( */}
          <div className="row">
            <ul>
              <li>Seller: <span>{details.name}</span></li>
              <li>Joined Since: <span>{details.joined}</span></li>
              <li>Location: <span>{details.location}</span></li>
              <li>Phone: <span>{details.phone}</span></li>
            </ul>
          </div>
        {/* ))} */}
      </div>
      </>
      )}
    </>
  );
};

export default SellerAbout;
