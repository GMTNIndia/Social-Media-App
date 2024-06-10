import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ChatInput from "./Chatinput";

export default function ChatContainer({ currentChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const ws = useRef(null);
  useEffect(() => {
    if (!token) {
      // Redirect to login page or handle authentication flow
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/chat/${userId}/${currentChat.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, currentChat.id, token]);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    if (!token) {
      // Redirect to login page or handle authentication flow
      return;
    }

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`);

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    };

    return () => {
      ws.close();
    };
  }, [userId, token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const newMsg = {
      sender: userId,
      receiver: currentChat.id,
      message: newMessage,
    };

    axiosInstance.post('http://127.0.0.1:8000/send-message/', newMsg)
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage('');
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(newMsg));
        }
      })
      .catch(error => console.error('Error sending message:', error));
  };


  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar"></div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div ref={scrollRef} key={index}>
            <div className={`${message.sender == userId ? 'sender' : 'receiver'}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ChatInput userId={userId} currentChat={currentChat}/> */}

      <form className="input-container mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="messageInput"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Send
            </button>
          </form>
    </Container>
  );
}



const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          padding:10px;
        }
      }
    }
  }
 .chat-messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    color: black;
    gap: 1rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        overflow: auto;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sender {
      display: flex;
      justify-content: flex-end;
      .content {
        background-color: blue;
        padding: 0.5rem 1rem;
      border-radius: 10px;
      border: none;
      color: white;
      }
    }
    .receiver {
      display: flex;
      justify-content: flex-start;

        .content {
        background-color: red;
        padding: 0.5rem 1rem;
      border-radius: 10px;
      border: none;
      color: white;
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    color:white;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
     
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      border :none;
      outlineline:none
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
`;