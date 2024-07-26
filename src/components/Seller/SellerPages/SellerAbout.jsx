import React, { useEffect, useState } from "react";
import SellerServices from "../../../services/API/SellerServices";
import { Spinner } from "react-bootstrap";
import LoadingComponents from "../../Shared/LoadingComponents";
import { MdOutlineFlag, MdOutlineReportOff } from "react-icons/md";
import { AiOutlineLike , AiOutlineDislike } from "react-icons/ai";

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
        console.log('About', res.data);
        setDetails(res.data);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <>
          <div className="seller-about-section">
            <div className="seller-about-section-1">
              <p>
                {details.description}
              </p>
              <button>Report
                <MdOutlineFlag />
              </button>
            </div>
            <div className="seller-about-section-2">
              <ul>
                <li>Seller:{details.name}</li>
                <li>Location:{details.location}</li>
                <li>Phone:{details.phone}</li>
                <li>Joined since:{details.joined}</li>
              </ul>
            </div>
            <div className="seller-about-section-3">
              <button>Contact</button>
            </div>
            <div className="seller-about-section-4">
              <h2>Our Top Related Seller</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <div className="seller-about-section-5">
              <p>Do you like our store experience?</p>
              <ul>
                <li>
                  <div>
                  <AiOutlineLike />
                  </div>
                </li>
                <li>
                  <div>
                  <AiOutlineDislike />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SellerAbout;
