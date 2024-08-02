import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import NoDataFound from '../components/Shared/NoDataFound';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import Footer from '../components/Footer';
import ProductCard from '../components/Shared/Cards/ProductCard';
import { toast } from 'react-toastify';
import ProductServices from '../services/API/ProductServices';

const NewArrivals21Plus = ({cartFullResponse , notificationCount}) => {
    const [productData, setProductData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [favData, setFavData] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const isLoggedin = localStorage.getItem("access_token");
    const [loading, setLoading] = useState(true);
  
    const handleToggleFavourite = (index) => {
      const updatedProducts = [...productData];
      updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
      setProductData(updatedProducts);
    };
  
    const getUnderAgeProducts = async () => {
      try {
        const res = await ProductServices.getUnderAgeProducts(loggedInUser?.id);
        if (res.status) {
          setProductData(res.data?.products);
          setPagination(res?.data?.pagination)
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        }
      } catch (error) {
          setLoading(false)
        toast.error(error?.response?.data?.message)
      }
    };
  
  
    useEffect(() => {
      getUnderAgeProducts();
    }, []);
    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">New Arrival Products</h1>
                            </div>
                            {loading ?
                                <>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                </>
                                :
                                (productData?.length > 0 ?
                                    productData?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No latest auction products found'} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <GetSurprisedBanner />
            <Footer />
        </>
    )
}

export default NewArrivals21Plus