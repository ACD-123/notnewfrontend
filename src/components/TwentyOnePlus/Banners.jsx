import React, { useEffect, useState } from 'react'
import Bannerimage from '../../assets/Images/Elements/banner.png'
import Bannerimage1 from '../../assets/Images/Elements/banner2.png'
import Arrow from '../../assets/Images/Elements/arrow.png'
import notFound from '../../pages/NotFound'
import { Link } from 'react-router-dom'
import Skeleton from 'react-skeleton-loader';
import HomeService from '../../services/API/HomeService'
import { toast } from 'react-toastify'

const Banners = () => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [banners, setBanners] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);
    const [topSelling, setTopSelling] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const user_id = localStorage.getItem('user_id');

    const getUnderAgeBanners = (id) => {
        HomeService.getUnderAgeBanners(id)
            .then((response) => {
                setBanners(response?.data?.banners)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getUnderAgeBanners(user_id)
    }, [])

    return (
        // <>
        //     {loading ?
        //             <div id="carouselExampleIndicators">
        //                 <Skeleton />
        //             </div>
        //         :
        //         banners?.length > 0 ?
        //             <section id='banners'>
        //                 <div className='container'>
        //                     <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        //                         <div className="carousel-inner">
        //                             {banners?.map((item, index) => {
        //                                 return (
        //                                     <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
        //                                         style={{
        //                                             backgroundImage: `url(${item?.image})`,
        //                                             backgroundSize: `cover`
        //                                         }}
        //                                         key={index}
        //                                     >
        //                                         <div className='banner-text-button'>
        //                                             <h1>Best Deals <br></br>In Town</h1>
        //                                             <p>There are many variations of passages of Lorem Ipsum available</p>
        //                                             <Link to="/product-filter"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
        //                                         </div>
        //                                     </div>
        //                                 )
        //                             })}
        //                         </div>
        //                         <div className="carousel-indicators">
        //                             {data?.map((item, index) => {
        //                                 return (
        //                                     <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index + 1}"`}></button>
        //                                 )
        //                             })}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>
        //             :
        //             null
        //     }
        // </>
           <>
           {loading ?
             <div id="carouselExampleIndicators">
               <Skeleton  />
             </div>
             :
             banners?.length > 0 ?
               <section id='banners'>
                 <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                   {loading ?
                     <Skeleton />
                     :
                     <>
                       <div className="carousel-inner">
                         {banners?.map((item, index) => {
                           return (
                             <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                               style={{
                                 backgroundImage: `linear-gradient(rgba(108, 94, 159, 0.5), rgba(108, 94, 159, 0.5)), url(${item?.image})`,
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                                 backgroundRepeat: 'no-repeat'
                               }}
                               key={index}
                             >
                               <div className="container">
                                 <div className='banner-text-button'>
                                   <h1>Best Deals <br></br>In Town</h1>
                                   <p>There are many variations of passages of Lorem Ipsum available</p>
                                   <Link to="/product-filter"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
                                 </div>
                               </div>
                             </div>
                           )
                         })}
                       </div>
     
                       <div className="carousel-indicators">
                         {data?.map((item, index) => {
                           return (
                             <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index + 1}"`}></button>
                           )
                         })}
                       </div>
                     </>
                   }
                 </div>
               </section>
               :
               null
           }
         </>
    )
}

export default Banners