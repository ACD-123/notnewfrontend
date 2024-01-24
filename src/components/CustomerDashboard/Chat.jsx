import React, { useState, useEffect } from 'react';
import Dp from '../../assets/Images/Chat/list1.png'
import Dp1 from '../../assets/Images/Chat/list2.png'
import Convoimage from '../../assets/Images/Seller/sellerimage.png'
import Sendbutton from '../../assets/Images/send.png'

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (selectedChat !== null) {
      const receivedMsgs = [
        { id: messages.length + 1, text: 'First dummy received message', sender: `Friend ${selectedChat}` },
        { id: messages.length + 2, text: 'Second dummy received message', sender: `Friend ${selectedChat}` },
        { id: messages.length + 3, text: 'Third dummy received message', sender: `Friend ${selectedChat}` },
      ];

      // Simulate delayed reception of messages
      const delay = setTimeout(() => {
        setMessages([...messages, ...receivedMsgs]);
      }, 500); // Change the delay time as needed (in milliseconds)

      return () => clearTimeout(delay); // Clear timeout on component unmount
    }
  }, [selectedChat]); // Run effect when selectedChat changes
  const chatList = [
    { id: 1, name: 'John Doe', images: [
        Dp,
      ], description: 'This book is a treatise on the theory of ethics' },
    { id: 2, name: 'Steve Smith', images: [
        Dp1,
      ], description: 'This book is a treatise on the theory of ethics' },
    { id: 3, name: 'Michael Johnson', images: [
        Dp,
      ], description: 'This book is a treatise on the theory of ethics' },
    { id: 4, name: 'Albert', images: [
        Dp1,
      ], description: 'This book is a treatise on the theory of ethics' },
    // Add more chats as needed
  ];

  const handleChatSelection = (chatId) => {
    const selectedChatMessages = getMessagesForChat(chatId);
    setSelectedChat(chatId);
    setMessages(selectedChatMessages);
  };

  const getMessagesForChat = (chatId) => {
    // Simulated messages for different chats (replace with your logic)
    if (chatId === 1) {
      return [
        { id: 1, text: 'Hey there!', sender: 'Friend 1' },
        { id: 2, text: 'Hi! How are you?', sender: 'user' },
        { id: 3, text: 'Hi! How are you?', sender: 'user' },
        { id: 4, text: 'Hi! How are you?', sender: 'user' },
      ];
    } else if (chatId === 2) {
      return [
        { id: 1, text: 'Hello!', sender: 'Friend 2' },
        { id: 2, text: 'I am good, thanks!', sender: 'user' },
        // Add more messages as needed
      ];
    }
    return [];
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const filterChats = () => {
    return chatList.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="chat-container">
    <div className='row chatlist'>
      <div className='col-lg-4 chhh'>
        <div className="sidebar">
          <h2>Chats</h2>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filterChats().map((chat) => (
              <li
              key={chat.id}
              onClick={() => handleChatSelection(chat.id)}
              className={selectedChat === chat.id ? 'active-chat' : ''}
            >
              <div className='list-image-chat'>
                <img src={chat.images ? chat.images[0] : ''} alt={chat.name} />
                <strong>{chat.name}</strong>
                <p>{chat.description}</p>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='col-lg-8'>
        <div className="conversation">
          {selectedChat ? (
            <div className="messages-container">
              <div className="chat-header">
                <img src={chatList[selectedChat - 1].images[0]} alt={chatList[selectedChat - 1].name}  />
                <h3>{chatList[selectedChat - 1].name}</h3>
              </div>
              <div className='messages-cont'>
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="sent-message">
                      {msg.text}
                    </div>
                  );
                } else {
                  return (
                    <div key={msg.id} className="received-message">
                      {msg.text}
                    </div>
                  );
                }
              })}
</div>
              <div className="message-input">
                <div className='row align-items-center'>
                <div className='col-lg-9'>
                <textarea
                  type="textarea"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                </div>
                <div className='col-lg-3'>
                <button onClick={sendMessage}> Send</button>
                </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-chat-selected">
                <h3>Select a chat to start conversation</h3>
                <img src={Convoimage} style={{width: "60% "}} />
                </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Chat;
