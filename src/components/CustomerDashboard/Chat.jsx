import React, { useState, useEffect } from "react";
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
  const [selectedSenderChat, setSelectedSenderChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatLists, setChatList] = useState([]);
  let loggedInUser = JSON.parse(localStorage.getItem('user_details'));
  let senders;
  let reciepnt;
  const getUserChat = () => {
    UserServices.conversations()
      .then((response) => {
        setChatList(response);
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

  const handleChatSelection = (reciptId, senderId) => {
    setSelectedChat(null);
    setMessages(null);
    UserServices.messages(senderId)
      .then((response) => {
        let data;
        let messages = [];
        response.map((message) => {
            data = {
              id: message.recipient_id,
              text: message.data,
              sender: message.sender_id,
            };
            messages.push(data);
        });
        setSelectedChat(reciptId);
        setMessages(messages);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const getMessagesForChat = (chatId) => {
    // console.log('getMessagesForChat id', chatId)
    UserServices.messages(chatId)
      .then((response) => {
        // console.log('getMessagesForChat', response)
        response.map((message) => {
          // console.log('message', message)
          return [
            {
              id: message.recipient_id,
              text: message.data,
              sender: message.sender_id
            },
            //     { id: 2, text: 'Hi! How are you?', sender: 'user' },
            //     { id: 3, text: 'Hi! How are you?', sender: 'user' },
            //     { id: 4, text: 'Hi! How are you?', sender: 'user' },
          ];
        });
        // setChatList(response)
      })
      .catch((e) => {
        console.log("error", e);
      });

    // messages
    // Simulated messages for different chats (replace with your logic)
    // if (chatId === 1) {
    //   return [
    //     { id: 1, text: 'Hey there!', sender: 'Friend 1' },
    //     { id: 2, text: 'Hi! How are you?', sender: 'user' },
    //     { id: 3, text: 'Hi! How are you?', sender: 'user' },
    //     { id: 4, text: 'Hi! How are you?', sender: 'user' },
    //   ];
    // } else if (chatId === 2) {
    //   return [
    //     { id: 1, text: 'Hello!', sender: 'Friend 2' },
    //     { id: 2, text: 'I am good, thanks!', sender: 'user' },
    //     // Add more messages as needed
    //   ];
    // }
    return [];
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: loggedInUser.id,
      };
      const newMassage = {
        recipient_id: reciepnt,
        product_id: "2a646db9-a644-471f-9e58-fef2d3bbe05a",
        data: newMessage,
        sender_id: senders
      };
      MessagesServices.saveAssociated(newMassage)
      .then((response) => {
        if(response.status){
          setMessages([...messages, newMsg]);
          setNewMessage("");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
    }
  };

  const filterChat = () => {
    return chatList.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const filterChats = () => {
    return chatLists.filter(
      (chat) =>
        chat.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
      // chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  useEffect(() => {
    getUserChat();
    // if (selectedChat !== null) {
    // //   const receivedMsgs = [
    // //     { id: messages.length + 1, text: 'First dummy received message', sender: `Friend ${selectedChat}` },
    // //     { id: messages.length + 2, text: 'Second dummy received message', sender: `Friend ${selectedChat}` },
    // //     { id: messages.length + 3, text: 'Third dummy received message', sender: `Friend ${selectedChat}` },
    // //   ];
    // //   // Simulate delayed reception of messages
    // //   const delay = setTimeout(() => {
    // //     setMessages([...messages, ...receivedMsgs]);
    // //   }, 500); // Change the delay time as needed (in milliseconds)

    // //   return () => clearTimeout(delay); // Clear timeout on component unmount
    // }
    // }, [selectedChat]);
  }, []);
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
            <ul>
              {filterChats().map((chat) => {
                return (
                  <li
                    key={chat.id}
                    onClick={() => handleChatSelection(chat.recipient_id, chat.sender_id)}
                    className={
                      selectedChat === chat.recipient_id ? "active-chat" : ""
                    }
                  >
                    <div className="list-image-chat">
                      {/* <img src={chat.images ? chat.images[0] : ''} alt={chat.name} /> */}
                      <img
                        src={
                          chat.recipient_image ? chat.recipient_image : blank
                        }
                        style={{ borderRadius: "40px" }}
                        width="40"
                        height="40"
                        alt={chat.recipient_name}
                      />
                      <strong>{chat.recipient_name}</strong>
                      {/* <strong>{chat.name}</strong> */}
                      <p>{chat.data.substring(0, 10)}...</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="conversation">
            {selectedChat ? (
              <div className="messages-container">
                <div className="chat-header">
                  {/* {chatLists.map((chat) => {
                  console.log()
                  if(chat === selectedChat){
                    console.log('chat', chat)
                  }else{
                    console.log('chatss')
                  }
                  return(
                    <></>
                  )
                })} */}
                  {/* {chatLists[selectedChat].image ? (
                  <>
                    <img src={chatLists[selectedChat].image} alt={chatLists[selectedChat].recipient_name}  />
                  </>
                ):(
                  <> 
                  <img src={blank} alt="blank"  width="50" height="50" />
                   </>
                )} */}
                  {/* {chatLists[selectedChat].sender_id} */}
                  {/* <h3>{chatLists[selectedChat].recipient_name}</h3> */}
                  {/* <h3>{chatLists.recipient_name}</h3> */}
                </div>
                <div className="messages-cont">
                  {messages.map((msg) => {
                    if (msg.sender === loggedInUser.id) {
                      senders = msg.id
                      return (
                        <div key={msg.id} className="sent-message">
                          {msg.text}
                        </div>
                      );
                    } else {
                      reciepnt = msg.id
                      return (
                        <div key={msg.id} className="received-message">
                          {msg.text}
                        </div>
                      );
                    }
                  })}
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
