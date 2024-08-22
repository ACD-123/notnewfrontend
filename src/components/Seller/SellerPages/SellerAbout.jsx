import React, { useEffect, useState } from "react";
import SellerServices from "../../../services/API/SellerServices";
import { Modal } from "react-bootstrap";
import LoadingComponents from "../../Shared/LoadingComponents";
import { MdOutlineFlag } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { isLoggedin } from "../../../services/Auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/Constant";

const SellerAbout = () => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [reportData, setReportData] = useState({
    reason: '',
    message: ''
  });
  const navigate = useNavigate()

  const { pathname } = window.location;
  const id = pathname.split("/").pop();


  const getAbout = () => {
    SellerServices.getShopDetailAbout(id)
      .then((res) => {
        setDetails(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setReportData(prev => ({ ...prev, [name]: checked }));
    } else {
      setReportData(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInputError(true);
    const formData = new FormData();
    formData.append("reason", reportData?.reason);
    formData.append("message", reportData?.message);
    formData.append("seller_guid", id);
    if (reportData.message != '' && reportData?.reason != '') {
      setIsLoading(true);
      SellerServices.createSellerReport(formData)
        .then((res) => {
          setIsLoading(false);
          setShowReport(false);
          toast.success(res.message)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    getAbout();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="seller-profile-feedback-loader">
          <LoadingComponents />
        </div>
      ) : (
        <>
          <div className="seller-about-section">
            {details.video ?
              <div className="seller-about-section-6">
                <video width="100%" controls>
                  <source src={`${BASE_URL}/public/${details?.video}`} />
                  Your browser does not support the video tag.
                </video>
              </div>
              :
              null
            }
            <div className="seller-about-section-1">
              <p>
                {details.description}
              </p>
              <button onClick={() => { setShowReport(true) }}>Report<MdOutlineFlag /></button>
            </div>
            <div className="seller-about-section-2">
              <ul>
                <li>Seller : {details.name}</li>
                <li>Location : {details.location}</li>
                <li>Phone : {details.phone}</li>
                <li>Joined since : {details.joined}</li>
              </ul>
            </div>
            <div className="seller-about-section-3">

              {isLoggedin() ?
                <button onClick={() => navigate(`/customerdashboard?tab=messages&id=${id}`)}>Contact</button>
                :
                <button onClick={() => navigate(`/signup`)}>Contact</button>
              }
            </div>
            <div className="seller-about-section-4">
              <h2>Our Top Related Seller</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <div className="seller-about-section-5">
              {/* <p>Do you like our store experience?</p>
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
              </ul> */}
            </div>
          </div>
        </>
      )}

      <Modal show={showReport} size="lg" className="report-modal-wrap" onHide={setShowReport} backdrop="static">
        <div className="modal-body">
          <span className="close" onClick={() => { setShowReport(false) }}><RxCross2 /></span>
          <form onSubmit={onSubmit}>
            <h2>Report</h2>
            <div className="input">
              <label htmlFor="">Reason to Report</label>
              <input type="text" name="reason" value={reportData?.reason} onChange={handleChange} placeholder="Enter reason of report" />
              {reportData.reason === "" && inputError &&
                <div className="error-input">Reason of report is required</div>
              }
            </div>
            <div className="input">
              <label htmlFor="">Your Report Request</label>
              <textarea type="text" name="message" value={reportData?.message} onChange={handleChange} placeholder="Enter your report request" />
              {reportData.message === "" && inputError &&
                <div className="error-input">Report request is required</div>
              }
            </div>
            <p>Make sure your reason and report should be authentic </p>
            <div className="button">
              <button>Send Report</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SellerAbout;
