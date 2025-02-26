import React, { useState, useEffect, useRef } from "react";
import Convoimage from "../assets/Images/Seller/sellerimage.png";
import MessagesServices from "../services/API/MessagesServices";
import UserServices from "../services/API/UserServices";
import blank from "../assets/Images/User/blankuser.jpg";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/Constant";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import NoDataFound from "./Shared/NoDataFound";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponents from "./Shared/LoadingComponents";
import laravelEcho from "../socket/index";
import { RxCross2 } from "react-icons/rx";

function UserChat() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [chatLists, setChatList] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [newChat, setNewChat] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingChat, setLoadingChat] = useState(false);
    const user_id = localStorage.getItem('user_id');
    const location = useLocation();
    const navigator = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const room_id = searchParams.get('room-id');
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const channel = laravelEcho.channel("chat-channel-" + user_id);
        channel.listen(".chat-channel", (data) => {
            getUserChat({ participants: room_id });
        });

        return () => {
            channel.stopListening(".chat-channel");
        };
    }, [user_id]);

    const getUserChat = (data) => {
        UserServices.conversations(user_id, 1)
            .then((response) => {
                setChatList(response?.data);
                for (let i = 0; i < response?.data?.length; i++) {
                    if (data?.participants == response?.data[i]?.id) {
                        getMessagesById(data?.participants)
                        if (selectedChat === null) {
                            setSelectedChat(response?.data[i])
                        }
                    }
                }

                getChatUsers();
                setNewChat(false)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setLoading(false)
            });
    };

    const handleChatSelection = (reciptId, chat) => {
        setLoadingChat(true)
        setShowChat(true);
        UserServices.getMessagesById(reciptId, user_id)
            .then((response) => {
                setSelectedChat(chat);
                setMessages(response?.data);
                setLoadingChat(false)
                getUserChat(null)
                navigator(`/customerdashboard?tab=messages&room-id=${reciptId}`)
            })
            .catch((error) => {
                setLoadingChat(false)
                toast.error(error?.response?.data?.message)
            });
    };

    const getMessagesById = (reciptId) => {
        UserServices.getMessagesById(reciptId, user_id)
            .then((response) => {
                setMessages(() => response?.data);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });
    };

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMassage = {
                room_id: selectedChat?.id,
                uid: selectedChat?.participants == user_id ? selectedChat?.uid : selectedChat?.participants,
                from_id: user_id,
                message_type: 0,
                message: newMessage,
                status: 1
            };

            MessagesServices.sendChatMessage(newMassage)
                .then((response) => {
                    getUserChat({ participants: selectedChat?.id });
                    setNewMessage("");
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message)
                });
        }
    };

    const filterChats = () => {
        return chatLists?.filter(
            (chat) =>
                chat?.receiver_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    };

    const getChatUsers = () => {
        MessagesServices.getChatUsers(user_id, 1)
            .then((response) => {
                setChatUsers(response?.data);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });
    }

    const createChatRooms = (data) => {
        setLoading(true)
        MessagesServices.createChatRooms({
            uid: user_id,
            participants: data?.guid,
            status: 1
        })
            .then((response) => {
                setLoading(false)
                setNewChat(false)
                getChatUsers()
                navigator(`/customerdashboard?tab=messages&room-id=${response?.data?.id}`)
            })
            .catch((error) => {
                setLoading(false)
                setNewChat(false)
                getChatUsers()
                toast.error(error?.response?.data?.message)
            });
    }

    useEffect(() => {
        getChatUsers();
    }, []);

    useEffect(() => {
        if (room_id != null) {
            getUserChat({ participants: room_id });
        } else {
            getUserChat(null);
        }
    }, [room_id]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const seller_Id = searchParams.get('id');
        if (seller_Id) {
            createChatRooms({ guid: seller_Id });
        }
    }, []);

    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {loading ?
                <div className="customer-chat-loader">
                    <LoadingComponents />
                </div>
                :
                <>
                    <div className="main-content" id="hide-on-mobile-500">
                        <div className="chat-container">
                            <div className="chat-container-wrap">
                                <div className="chat-container-wrap-left">
                                    <div className="sidebar">
                                        <div className="chat-top">
                                            <h2>Chats</h2>
                                            <span onClick={() => { setNewChat(true) }}><IoChatboxEllipsesOutline /></span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search chats..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="chat-listing-wrap">
                                            <ul>
                                                {filterChats().map((chat) => {
                                                    return (
                                                        <li
                                                            key={chat?.id}
                                                            onClick={() => handleChatSelection(chat?.id, chat)}
                                                            className={selectedChat?.id === chat?.id ? "active-chat" : chat?.read_count > 0 ? "active-count" : ""}>
                                                            <div className="list-image-chat">
                                                                <div>
                                                                    {chat?.sender_profile_image?.includes('http') ?
                                                                        <img
                                                                            src={chat?.sender_profile_image}
                                                                            style={{ borderRadius: "40px" }} width="40" height="40"
                                                                        />
                                                                        :
                                                                        <img
                                                                            src={chat?.sender_profile_image ? "https://notnewbackendv2.testingwebsitelink.com/" + chat?.sender_profile_image : blank}
                                                                            style={{ borderRadius: "40px" }} width="40" height="40"
                                                                        />
                                                                    }
                                                                </div>
                                                                <div className="name-mgs">
                                                                    <div className="name">{chat?.sender_name}</div>
                                                                    <p className="message">{chat?.message?.substring(0, 10)}...</p>
                                                                </div>
                                                                <div className="time">
                                                                    {selectedChat?.id == messages?.[0]?.room_id && selectedChat?.id && messages?.[0]?.room_id ? null :
                                                                        chat?.read_count > 0 &&
                                                                        <div className="read">
                                                                            <span>
                                                                                {chat?.read_count}
                                                                            </span>
                                                                        </div>

                                                                    }
                                                                    <div className="time">
                                                                        {chat?.date?.slice(0, 5)}
                                                                        {chat?.date?.slice(9, 20)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-container-wrap-right">
                                    <div className="conversation">
                                        {messages?.length > 0 ? (
                                            loadingChat ?
                                                <div className="customer-chat-detail-loader">
                                                    <LoadingComponents />
                                                </div>
                                                :
                                                <div className="messages-container">
                                                    <div className="chat-header">
                                                        {selectedChat?.sender_profile_image ? (
                                                            <>
                                                                {selectedChat?.sender_profile_image?.includes('google') ?
                                                                    <img src={selectedChat?.sender_profile_image} />
                                                                    :
                                                                    <img src={"https://notnewbackendv2.testingwebsitelink.com/" + selectedChat?.sender_profile_image} />
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img src={blank} alt="blank" />
                                                            </>
                                                        )}
                                                        {selectedChat?.sender_id}
                                                        <div className="name-last-seen">
                                                            <h3>{selectedChat?.sender_name}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="messages-cont" ref={chatContainerRef}>
                                                        <div className="messages-cont-wrap">
                                                            {messages?.map((msg) => {
                                                                if (msg?.from_id == user_id) {
                                                                    return (
                                                                        <div
                                                                            key={msg?.id}
                                                                            className="sent-message">
                                                                            <div className="sent-message-wrap">
                                                                                {msg?.testuser?.profile_image ?
                                                                                    <img src={"https://notnewbackendv2.testingwebsitelink.com/" + msg?.testuser?.profile_image} />
                                                                                    :
                                                                                    <img src={blank} />
                                                                                }
                                                                                <p className="message">{msg?.message}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            key={msg?.id}
                                                                            className="received-message">
                                                                            <div className="received-message-wrap">
                                                                                {msg?.testuser ? (
                                                                                    <>
                                                                                        {msg?.testuser?.profile_image?.includes("http") ?
                                                                                            <img src={msg?.testuser?.profile_image} />
                                                                                            :
                                                                                            msg?.seller?.cover_image ?
                                                                                                <img src={"https://notnewbackendv2.testingwebsitelink.com/" + msg?.seller?.cover_image} />
                                                                                                :
                                                                                                <img src={blank} />
                                                                                        }
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <img src={blank} alt="blank" />
                                                                                    </>
                                                                                )}
                                                                                <p>
                                                                                    {msg?.message}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="message-input">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="-1.3151" y="1.3151" width="28.9321" height="28.9321" rx="14.4661" transform="matrix(-1 0 0 1 28.9323 0)" stroke="url(#paint0_linear_14_4369)" stroke-width="2.63019" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_14_4369" x1="15.7812" y1="0" x2="15.7812" y2="31.5623" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#8B2CA0" />
                                                                    <stop offset="1" stop-color="#00C3C9" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        <input type="text" placeholder="Type a message..."
                                                            value={newMessage}
                                                            onChange={(e) => setNewMessage(e.target.value)} />
                                                        <span onClick={sendMessage}>
                                                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.6644 15.5545L15.6123 10.5939M6.91887 5.42589L18.653 1.51537C23.9188 -0.239528 26.7797 2.63463 25.0383 7.89932L21.1269 19.6309C18.5009 27.521 14.1888 27.521 11.5628 19.6309L10.4018 16.1487L6.91887 14.988C-0.972957 12.3626 -0.972957 8.06514 6.91887 5.42589Z" stroke="url(#paint0_linear_14_4370)" stroke-width="1.75346" strokeLinecap="round" stroke-linejoin="round" />
                                                                <defs>
                                                                    <linearGradient id="paint0_linear_14_4370" x1="13.2742" y1="1" x2="13.2742" y2="25.5485" gradientUnits="userSpaceOnUse">
                                                                        <stop stop-color="#8B2CA0" />
                                                                        <stop offset="1" stop-color="#00C3C9" />
                                                                    </linearGradient>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                        ) : (
                                            loadingChat ?
                                                <div className="customer-chat-detail-loader">
                                                    <LoadingComponents />
                                                </div>
                                                :
                                                <div className="no-chat-selected">
                                                    <h3>Select a chat to start conversation</h3>
                                                    <img src={Convoimage} style={{ width: "60% " }} />
                                                </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-content" id="hide-on-desktop-500">
                        <div className="chat-container">
                            <div className="chat-container-wrap">
                                {!showChat ?
                                    <div className="chat-container-wrap-left">
                                        <div className="sidebar">
                                            <div className="chat-top">
                                                <h2>Chats</h2>
                                                <span onClick={() => { setNewChat(true) }}><IoChatboxEllipsesOutline /></span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search chats..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <div className="chat-listing-wrap">
                                                <ul>
                                                    {filterChats().map((chat) => {
                                                        return (
                                                            <li
                                                                key={chat?.id}
                                                                onClick={() => handleChatSelection(chat?.id, chat)}
                                                                className={selectedChat?.id === chat?.id ? "active-chat" : chat?.read_count > 0 ? "active-count" : ""}>
                                                                <div className="list-image-chat">
                                                                    <div>
                                                                        {chat?.sender_profile_image?.includes('http') ?
                                                                            <img
                                                                                src={chat?.sender_profile_image}
                                                                                style={{ borderRadius: "40px" }} width="40" height="40"
                                                                            />
                                                                            :
                                                                            <img
                                                                                src={chat?.sender_profile_image ? "https://notnewbackendv2.testingwebsitelink.com/" + chat?.sender_profile_image : blank}
                                                                                style={{ borderRadius: "40px" }} width="40" height="40"
                                                                            />
                                                                        }
                                                                    </div>
                                                                    <div className="name-mgs">
                                                                        <div className="name">{chat?.sender_name}</div>
                                                                        <p className="message">{chat?.message?.substring(0, 10)}...</p>
                                                                    </div>
                                                                    <div className="time">
                                                                        {selectedChat?.id == messages?.[0]?.room_id && selectedChat?.id && messages?.[0]?.room_id ? null :
                                                                            chat?.read_count > 0 &&
                                                                            <div className="read">
                                                                                <span>
                                                                                    {chat?.read_count}
                                                                                </span>
                                                                            </div>

                                                                        }
                                                                        <div className="time">
                                                                            {chat?.date?.slice(0, 5)}
                                                                            {chat?.date?.slice(9, 20)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="chat-container-wrap-right">
                                        <div className="conversation">
                                            {messages?.length > 0 ? (
                                                loadingChat ?
                                                    <div className="customer-chat-detail-loader">
                                                        <LoadingComponents />
                                                    </div>
                                                    :
                                                    <div className="messages-container">
                                                        <div className="chat-header">
                                                            {selectedChat?.sender_profile_image ? (
                                                                <>
                                                                    {selectedChat?.sender_profile_image?.includes('google') ?
                                                                        <img src={selectedChat?.sender_profile_image} />
                                                                        :
                                                                        <img src={"https://notnewbackendv2.testingwebsitelink.com/" + selectedChat?.sender_profile_image} />
                                                                    }
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img src={blank} alt="blank" />
                                                                </>
                                                            )}
                                                            {selectedChat?.sender_id}
                                                            <div className="name-last-seen">
                                                                <h3>{selectedChat?.sender_name}</h3>
                                                            </div>
                                                            <div className="close-chat" onClick={() => { setShowChat(false) }}>
                                                                <RxCross2 />
                                                            </div>
                                                        </div>
                                                        <div className="messages-cont" ref={chatContainerRef}>
                                                            <div className="messages-cont-wrap">
                                                                {messages?.map((msg) => {
                                                                    if (msg?.from_id == user_id) {
                                                                        return (
                                                                            <div
                                                                                key={msg?.id}
                                                                                className="sent-message">
                                                                                <div className="sent-message-wrap">
                                                                                    {
                                                                                        msg?.testuser?.profile_image ?
                                                                                            <img src={"https://notnewbackendv2.testingwebsitelink.com/" + msg?.testuser?.profile_image} />
                                                                                            :
                                                                                            <img src={blank} />
                                                                                    }
                                                                                    <p className="message">{msg?.message}</p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div
                                                                                key={msg?.id}
                                                                                className="received-message">
                                                                                <div className="received-message-wrap">
                                                                                    {msg?.testuser ? (
                                                                                        <>
                                                                                            {msg?.testuser?.profile_image?.includes("http") ?
                                                                                                <img src={msg?.testuser?.profile_image} />
                                                                                                :
                                                                                                <img src={"https://notnewbackendv2.testingwebsitelink.com/" + msg?.seller?.cover_image} />
                                                                                            }
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <img src={blank} alt="blank" />
                                                                                        </>
                                                                                    )}
                                                                                    <p>
                                                                                        {msg?.message}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="message-input">
                                                            <input type="text" placeholder="Type a message..."
                                                                value={newMessage}
                                                                onChange={(e) => setNewMessage(e.target.value)} />
                                                            <div onClick={sendMessage}>
                                                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.6644 15.5545L15.6123 10.5939M6.91887 5.42589L18.653 1.51537C23.9188 -0.239528 26.7797 2.63463 25.0383 7.89932L21.1269 19.6309C18.5009 27.521 14.1888 27.521 11.5628 19.6309L10.4018 16.1487L6.91887 14.988C-0.972957 12.3626 -0.972957 8.06514 6.91887 5.42589Z" stroke="url(#paint0_linear_14_4370)" stroke-width="1.75346" strokeLinecap="round" stroke-linejoin="round" />
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear_14_4370" x1="13.2742" y1="1" x2="13.2742" y2="25.5485" gradientUnits="userSpaceOnUse">
                                                                            <stop stop-color="#8B2CA0" />
                                                                            <stop offset="1" stop-color="#00C3C9" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                            ) : (
                                                loadingChat ?
                                                    <div className="customer-chat-detail-loader">
                                                        <LoadingComponents />
                                                    </div>
                                                    :
                                                    <div className="no-chat-selected">
                                                        <h3>Select a chat to start conversation</h3>
                                                        <img src={Convoimage} style={{ width: "60% " }} />
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
            <Modal show={newChat} size="lg" className="user-list-for-chat-modal-wrap" onHide={setNewChat}>
                <div className="modal-body">
                    <h2>Seller Lists</h2>
                    <div className="user-list-for-chat">
                        <div className="user-list-for-chat-wrap">
                            {chatUsers?.length > 0 ?
                                <ul>
                                    {chatUsers?.map((data) => {
                                        return (
                                            <li onClick={() => { createChatRooms(data) }}>
                                                {data?.cover_image ?
                                                    <img src={`${BASE_URL}/${data?.cover_image}`} alt="" />
                                                    :
                                                    <img src={blank} alt="" />
                                                }
                                                <p>{data?.fullname}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                                :
                                <>
                                    <NoDataFound title={'No Data Found'} />
                                </>
                            }
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
}

export default UserChat;
