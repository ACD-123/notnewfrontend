import React, { useState, useEffect, useRef } from "react";
import Dp from "../../assets/Images/Chat/list1.png";
import Dp1 from "../../assets/Images/Chat/list2.png";
import Convoimage from "../../assets/Images/Seller/sellerimage.png";
import Sendbutton from "../../assets/Images/send.png";
import MessagesServices from "../../services/API/MessagesServices"; //~/services/API/MessagesServices
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import blank from "../../assets/Images/User/blankuser.jpg";
import { toast } from "react-toastify";
// getUserConversations
function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatLists, setChatList] = useState([]);
  let loggedInUser = JSON.parse(localStorage.getItem('user_details'));
  const getUserChat = () => {
    UserServices.conversations(loggedInUser?.id)
      .then((response) => {
        setChatList(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  // Run effect when selectedChat changes
  const chatList = [
    {
      id: 1,
      name: "John Doe",
      images: [Dp],
      description: "This book is a treatise on the theory of ethics",
    },
    {
      id: 2,
      name: "Steve Smith",
      images: [Dp1],
      description: "This book is a treatise on the theory of ethics",
    },
    {
      id: 3,
      name: "Michael Johnson",
      images: [Dp],
      description: "This book is a treatise on the theory of ethics",
    },
    {
      id: 4,
      name: "Albert",
      images: [Dp1],
      description: "This book is a treatise on the theory of ethics",
    },
    // Add more chats as needed
  ];

  const handleChatSelection = (reciptId, senderId, chat) => {
    UserServices.getMessagesById(reciptId)
      .then((response) => {

        setSelectedChat(chat);
        setMessages(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const getMessagesForChat = (chatId) => {
    UserServices.messages(chatId)
      .then((response) => {
        response.map((message) => {
          return [
            {
              id: message.recipient_id,
              text: message.data,
              sender: message.sender_id
            },
          ];
        });
        // setChatList(response)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
    return [];
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMassage = {
        room_id: selectedChat?.id,
        uid: selectedChat?.participants === loggedInUser?.id ? selectedChat?.uid : selectedChat?.participants,
        from_id: loggedInUser?.id,
        message_type: 0,
        message: newMessage,
        status: 1
      };
      MessagesServices.sendChatMessage(newMassage)
        .then((response) => {
          if (response.status) {
            // setMessages([...messages, newMsg]);
            getUserChat();
            handleChatSelection(selectedChat?.id, selectedChat?.participants, selectedChat)
            setNewMessage("");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    }
  };

  const filterChat = () => {
    return chatList?.filter((chat) =>
      chat?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  };
  const filterChats = () => {
    return chatLists?.filter(
      (chat) =>
        chat?.receiver_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  };
  useEffect(() => {
    getUserChat();
  }, []);

  const chatContainerRef = useRef(null);

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom on initial render and whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-container-wrap">
        <div className="chat-container-wrap-left">
          <div className="sidebar">
            <h2>Chats</h2>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="chat-listing-wrap">
              <ul>
                {filterChats().map((chat, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleChatSelection(chat?.id, loggedInUser?.id, chat)}
                      className={selectedChat === chat?.participants ? "active-chat" : ""}>
                      <div className="list-image-chat">
                        <div>
                          {chat?.sender_profile_image?.includes('google') ?
                            <img
                              src={chat?.sender_profile_image}
                              style={{ borderRadius: "40px" }} width="40" height="40"
                            />
                            :
                            <img
                              src={chat?.sender_profile_image ? "https://notnewbackend.testingwebsitelink.com/" + chat?.sender_profile_image : blank}
                              style={{ borderRadius: "40px" }} width="40" height="40"
                            />
                          }
                        </div>
                        <div className="name-mgs">
                          <div className="name">{chat?.sender_name}</div>
                          <p className="message">{chat?.message?.substring(0, 10)}...</p>
                        </div>
                        <div className="time">
                          {chat?.date?.slice(0, 5)}{" "}
                          {chat?.date?.slice(9, 20)}
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
              <div className="messages-container">
                <div className="chat-header">
                  {selectedChat?.sender_profile_image ? (
                    <>
                      {selectedChat?.sender_profile_image.includes('google') ?
                        <img src={selectedChat?.sender_profile_image} />
                        :
                        <img src={"https://notnewbackend.testingwebsitelink.com/" + selectedChat?.sender_profile_image} />
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
                    <h4>Last Seen 2 mins ago</h4>
                  </div>
                </div>
                <div className="messages-cont" ref={chatContainerRef}>
                  <div className="messages-cont-wrap">
                    {messages?.map((msg, index) => {
                      if (msg?.from_id === loggedInUser?.id) {
                        return (
                          <div key={msg?.from_id} className="sent-message">
                            <div key={msg?.from_id} className="sent-message-wrap">
                              {msg?.user ? (
                                <>
                                  {msg?.user?.profile_image.includes('google') ?
                                    <img src={msg?.user?.profile_image} />
                                    :
                                    <img src={"https://notnewbackend.testingwebsitelink.com/" + msg?.user?.profile_image} />
                                  }
                                </>
                              ) : (
                                <>
                                  <img src={blank} alt="blank" />
                                </>
                              )}
                              <p className="message">{msg?.message}</p>
                              {/* <div className="message">
                                <div className="time">
                                  {chat?.date?.slice(0, 5)}{" "}
                                  {chat?.date?.slice(9, 20)}
                                </div>
                              </div> */}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={msg?.from_id} className="received-message">
                            <div key={msg?.from_id} className="received-message-wrap">
                              {msg?.participants ? (
                                <>
                                  {msg?.participants?.profile_image.includes('google') ?
                                    <img src={msg?.participants?.profile_image} />
                                    :
                                    <img src={"https://notnewbackend.testingwebsitelink.com/" + msg?.participants?.profile_image} />
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
                      <path d="M10.6644 15.5545L15.6123 10.5939M6.91887 5.42589L18.653 1.51537C23.9188 -0.239528 26.7797 2.63463 25.0383 7.89932L21.1269 19.6309C18.5009 27.521 14.1888 27.521 11.5628 19.6309L10.4018 16.1487L6.91887 14.988C-0.972957 12.3626 -0.972957 8.06514 6.91887 5.42589Z" stroke="url(#paint0_linear_14_4370)" stroke-width="1.75346" stroke-linecap="round" stroke-linejoin="round" />
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
              <div className="no-chat-selected">
                <h3>Select a chat to start conversation</h3>
                <img src={Convoimage} style={{ width: "60% " }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
