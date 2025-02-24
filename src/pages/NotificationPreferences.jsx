import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SellerServices from '../services/API/SellerServices';
import { toast } from 'react-toastify';
import LoadingComponents from '../components/Shared/LoadingComponents';
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { RxCross2 } from "react-icons/rx";

const NotificationPreferences = ({ cartFullResponse, notificationCount }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('notification-settings');
  const [isLoading, setIsLoading] = useState(true);
  const [nSForm, setNSForm] = useState({
    auction_notification: 0,
    buying_notification: 0,
    chats_notification: 0,
    important_notification: 0,
    selling_notification: 0
  });
  const navigate = useNavigate();

  const getNotificationSetting = () => {
    SellerServices.getNotificationSetting()
      .then((response) => {
        setNSForm(response?.data)
        setIsLoading(false);

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      getNotificationSetting()
    } else {
      navigate('/')
    }
  }, [])

  const updateNotificationSettingg = (data) => {
    if (isLoading) return;
    setIsLoading(true);

    setNSForm((prev) => ({ ...data }));

    SellerServices.updateNotificationSetting(data)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  };

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <section id="main-dashboard">
        <div className="container">
          <div className="row">
            <div className="main-dasboard-tabs">
              <div className="tab-buttons">
                <div className="t-b-b">
                  <button onClick={() => { navigate('/customerdashboard?tab=activity&component=my-orders') }}>Activity</button>
                  <button onClick={() => { navigate('/customerdashboard?tab=messages') }}>Messages</button>
                  <button className="active" onClick={() => { navigate('/customerdashboard?tab=account') }}>Account</button>
                </div>
                <div className='t-b-w'>
                </div>
              </div>
              <div className="tab-content">
                <div className="account-dashboard">
                  <div className="row">
                    <div>
                      <section id='activity-main-dashboard'>
                        <div id="hide-on-desktop-991" onClick={toggleDrawer}>
                          <GiHamburgerMenu />
                        </div>
                        <div className='row'>
                          <div className='col-lg-3' id='hide-on-mobile-991'>
                            <div className={`left-menu`}>
                              <div className="title-customer-side">Notification</div>
                              <div className="personal-info">
                                <ul>
                                  <li className={selectedMenuItem === 'notification-settings' ? 'active' : ''}>
                                    Notification Settings
                                  </li>
                                </ul>
                                <div className="button">
                                  <button onClick={() => { navigate('/customerdashboard?tab=account') }}>Go Back</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-9'>
                            <div className="user-notification-setting">
                              {isLoading ?
                                <LoadingComponents />
                                :
                                <div className="user-notification-setting-wrap">
                                  <ul>
                                    <li>
                                      <div className="title">
                                        <h3>Important Notification</h3>
                                        <p>It is a long established fact that will be distracted content of a page when looking at its layout</p>
                                      </div>
                                      <div className="check"
                                        onClick={() => {
                                          updateNotificationSettingg({
                                            auction_notification: nSForm.auction_notification,
                                            buying_notification: nSForm.buying_notification,
                                            chats_notification: nSForm.chats_notification,
                                            important_notification: nSForm?.important_notification ? 0 : 1,
                                            selling_notification: nSForm.selling_notification
                                          })
                                        }}
                                      >
                                        <label class="switch3">
                                          <input type="radio" value={nSForm?.important_notification ? true : false} />
                                          <span class={`slider3 ${nSForm?.important_notification == 1 ? 'active' : ''}`}></span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">
                                        <h3>Chats Notification</h3>
                                        <p>It is a long established fact that will be distracted content of a page when looking at its layout</p>
                                      </div>
                                      <div className="check"
                                        onClick={() => {
                                          updateNotificationSettingg({
                                            auction_notification: nSForm.auction_notification,
                                            buying_notification: nSForm.buying_notification,
                                            chats_notification: nSForm.chats_notification ? 0 : 1,
                                            important_notification: nSForm?.important_notification,
                                            selling_notification: nSForm.selling_notification
                                          })
                                        }}
                                      >
                                        <label class="switch3">
                                          <input type="radio" value={nSForm?.chats_notification === 1 ? true : false} />
                                          <span class={`slider3 ${nSForm?.chats_notification == 1 ? 'active' : ''}`}></span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">
                                        <h3>Buying Notification</h3>
                                        <p>It is a long established fact that will be distracted content of a page when looking at its layout</p>
                                      </div>
                                      <div className="check"
                                        onClick={() => {
                                          updateNotificationSettingg({
                                            auction_notification: nSForm.auction_notification,
                                            buying_notification: nSForm.buying_notification ? 0 : 1,
                                            chats_notification: nSForm.chats_notification,
                                            important_notification: nSForm?.important_notification,
                                            selling_notification: nSForm.selling_notification
                                          })
                                        }}
                                      >
                                        <label class="switch3">
                                          <input type="radio" value={nSForm?.buying_notification === 1 ? true : false} />
                                          <span class={`slider3 ${nSForm?.buying_notification == 1 ? 'active' : ''}`}></span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">
                                        <h3>Selling Notification</h3>
                                        <p>It is a long established fact that will be distracted content of a page when looking at its layout</p>
                                      </div>
                                      <div className="check"
                                        onClick={() => {
                                          updateNotificationSettingg({
                                            auction_notification: nSForm.auction_notification,
                                            buying_notification: nSForm.buying_notification,
                                            chats_notification: nSForm.chats_notification,
                                            important_notification: nSForm?.important_notification,
                                            selling_notification: nSForm.selling_notification ? 0 : 1
                                          })
                                        }}
                                      >
                                        <label class="switch3">
                                          <input type="radio" value={nSForm?.selling_notification === 1 ? true : false} />
                                          <span class={`slider3 ${nSForm?.selling_notification == 1 ? 'active' : ''}`}></span>
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">
                                        <h3>Auction Notification</h3>
                                        <p>It is a long established fact that will be distracted content of a page when looking at its layout</p>
                                      </div>
                                      <div className="check"
                                        onClick={() => {
                                          updateNotificationSettingg({
                                            auction_notification: nSForm.auction_notification ? 0 : 1,
                                            buying_notification: nSForm.buying_notification,
                                            chats_notification: nSForm.chats_notification,
                                            important_notification: nSForm?.important_notification,
                                            selling_notification: nSForm.selling_notification
                                          })
                                        }}
                                      >
                                        <label class="switch3">
                                          <input type="radio" value={nSForm?.auction_notification === 1 ? true : false} />
                                          <span class={`slider3 ${nSForm?.auction_notification == 1 ? 'active' : ''}`}></span>
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='mobile-product-filter'
        size={'90%'}
      >
        <div className='left-menu'>
          <div className="title-selling-hub">Selling Hub <span onClick={toggleDrawer}><RxCross2 /></span></div>
          <div className="personal-info">
            <ul>
              <li className={selectedMenuItem === 'notification-settings' ? 'active' : ''} onClick={() =>{toggleDrawer();}}>
                Notification Settings
              </li>
            </ul>
            <div className="button">
              <button onClick={() => { navigate('/customerdashboard?tab=account'); toggleDrawer() }}>Go Back</button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NotificationPreferences;
