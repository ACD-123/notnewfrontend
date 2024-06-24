import React, { useState, useEffect, useRef } from "react";
import Dp from "../../assets/Images/Chat/list1.png";
import Dp1 from "../../assets/Images/Chat/list2.png";
import Convoimage from "../../assets/Images/Seller/sellerimage.png";
import Sendbutton from "../../assets/Images/send.png";
import MessagesServices from "../../services/API/MessagesServices"; //~/services/API/MessagesServices
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import blank from "../../assets/Images/User/blankuser.jpg";
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
      .catch((e) => {
        console.log("error", e);
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
        console.log(chat, 'asdasda');
        
        setSelectedChat(chat);
        setMessages(response?.data);
      })
      .catch((e) => {
        console.log("error", e);
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
      .catch((e) => {
        console.log("error", e);
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
        .catch((e) => {
          console.log("error", e);
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
      <div className="row chatlist">
        <div className="col-lg-4 chhh">
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
                          {chat?.receiver_profile_image?.includes('google') ?
                          <img
                            src={chat?.receiver_profile_image}
                            style={{ borderRadius: "40px" }} width="40" height="40"
                          />
                          :
                          <img
                            src={chat?.receiver_profile_image ? "https://notnewbackend.testingwebsitelink.com/"+chat?.receiver_profile_image : blank}
                            style={{ borderRadius: "40px" }} width="40" height="40"
                          />
                        }
                        </div>
                        <div>
                          <strong>{chat?.receiver_name}</strong>
                          <p>{chat?.message?.substring(0, 10)}...</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="conversation">
            {messages?.length > 0 ? (
              <div className="messages-container">
                <div className="chat-header">
                  {selectedChat?.receiver_profile_image ? (
                    <>
                    {selectedChat?.receiver_profile_image.includes('google') ?
                    <img src={selectedChat?.receiver_profile_image} />
                    :
                    <img src={"https://notnewbackend.testingwebsitelink.com/"+selectedChat?.receiver_profile_image} />
                  }
                    </>
                  ) : (
                    <>
                      <img src={blank} alt="blank"/>
                    </>
                  )}
                  {selectedChat?.sender_id}
                  <h3>{selectedChat?.receiver_name}</h3>
                </div>
                <div className="messages-cont" ref={chatContainerRef}>
                  <div className="messages-cont-wrap">
                    {messages?.map((msg, index) => {
                      if (msg?.from_id === loggedInUser?.id) {
                        return (
                          <div key={msg?.from_id} className="sent-message">
                            <p>
                              {msg?.message}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div key={msg?.from_id} className="received-message">
                            <p>
                              {msg?.message}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="message-input">
                  <div className="row align-items-center">
                    <div className="col-lg-9">
                      <textarea
                        type="textarea"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-3">
                      <button onClick={sendMessage}> Send</button>
                    </div>
                  </div>
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
