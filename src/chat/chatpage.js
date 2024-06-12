// // import React, { useEffect, useState } from 'react';
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Chatpage = () => {
//   const { chatId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const response = await axios.get(`http://127.0.0.1:8000/chat/${chatId}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessages(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [chatId]);

//   const sendMessage = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.post(`http://127.0.0.1:8000/send-message/`, 
//         { content: newMessage },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessages([...messages, response.data]);
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
//   const scrollRef = useRef();
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("accessToken");
//   const ws = useRef(null);
//   useEffect(() => {
//     if (!token) {
//       // Redirect to login page or handle authentication flow
//       return;
//     }

//   //   const fetchMessages = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://127.0.0.1:8000/chat/${userId}/${currentChat.id}/`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
//   //       setMessages(response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
//   //     } catch (error) {
//   //       console.error("Error fetching messages:", error);
//   //     }
//   //   };

//   //   fetchMessages();
//   // }, [userId, currentChat.id, token]);

//   const axiosInstance = axios.create({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   useEffect(() => {
//     if (!token) {
//       // Redirect to login page or handle authentication flow
//       return;
//     }

//     const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`);

//     ws.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, newMessage].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
//     };

//     return () => {
//       ws.close();
//     };
//   }, [userId, token]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);




//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };
//   return (
// <>

// </>
//   )
// };

// export default Chatpage;



// // {/* <div className="p-6 bg-gray-100 min-h-screen mt-20">
// // <h1 className="text-2xl font-bold mb-4">Chat with ID: {chatId}</h1>
// // <div className="border border-gray-300 p-4 h-96 overflow-y-scroll bg-white mb-6">
// //   {messages.map((message, index) => (
// //     <div key={index} className="mb-4">
// //       <p className="text-base">{message.message}</p>
// //       {/* <small className="text-gray-500">{message.timestamp}</small> */}
// //     </div>
// //   ))}
// // </div>
// // <div className="flex">




// // </div> */}
// {/* <input
//               type="text"
//               id="messageInput"
//               value={newMessage}
            
//               onChange={handleInputChange}
//               placeholder="Type a message..."
//               className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//         <button
//           onClick={sendMessage}
//           className="p-2 bg-blue-500 text-white border border-blue-500 rounded-r-md hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div> */}


//       {/* <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div ref={scrollRef} key={index}>
//             <div className={`${message.sender == userId ? 'sender' : 'receiver'}`}>
//               <div className="content">
//                 <p>{message.message}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div> */}
//       {/* <ChatInput userId={userId} currentChat={currentChat}/> */}
// {/* 
//       <form className="input-container mt-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               id="messageInput"
//               value={newMessage}
//               onChange={handleInputChange}
//               placeholder="Type a message..."
//               className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
//             >
//               Send
//             </button>
//           </form> */}




//                   {/* <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message"
//           className="flex-1 p-2 border border-gray-300 rounded-l-md"
//         /> */}




// import React, { useEffect, useState } from 'react';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
const Chatpage = ({ currentChat }) => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const ws = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://127.0.0.1:8000/chat/${chatId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const newMsg = {
        sender: userId,
        receiver: currentChat.id,
        message: newMessage,
      };
      const response = await axios.post(`http://127.0.0.1:8000/send-message/`, 
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };



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
        console.log([...messages, response.data]);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(newMsg));
        }
      })
      .catch(error => console.error('Error sending message:', error));
  };


  return (
    <Container>
    <div className="p-6 bg-gray-100  mt-20">
      <h1 className="text-2xl font-bold mb-4">Chat with ID: {chatId}</h1>
      <div className="border border-gray-300 p-4 h-96 overflow-y-scroll bg-white mb-6">
    



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
      </div>
      <div className="flex">
      
      </div>
    </div>
    </Container>
  );
};

export default Chatpage;







const Container = styled.div`
   display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  ${'' /* padding:px */}
  overflow: hidden;
  ${'' /* border:2px solid #873ADF; */}
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }


  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${'' /* padding-top: 30px; */}
    ${'' /* align-items: center; */}
    background-color: #873ADF;
    h3 {
      color: black;
      text-transform: uppercase;
      text-align: center;
    }
  }


  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${'' /* width:20px */}
    height:60px;
    margin-bottom:30px;
    ${'' /* padding: 0 2rem; */}

    ${'' /* background-color:blue: */}
    background-color: #873ADF;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-top:10px;
    gap: 1rem;
    overflow: auto;
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
        background-color: #873ADF;
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
        background-color: #5F6061;
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
    margin-bottom:30px;
    margin-top:10px;
    align-items: center;
    ${'' /* padding-bottom:1 rem */}
    
    gap: 2rem;
    color:white;
    input {
      width: 90%;
      height: 60%;
      ${'' /* background-color: transparent; */}
      background-color:#E5E6E8;;
      color: black;
      border: none;
      padding-left: 1rem;
      margin-left:10px;
      ${'' /* padding:1rem; */}
      padding: 1.6rem 1rem;
      font-size: 1.2rem;
     
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.9rem 1.2rem;
      ${'' /* padding: 1.6rem 1rem; */}
      ${'' /* border-radius: 2rem; */}
      display: flex;
      border :none;
      ${'' /* padding:15px; */}
      margin-right:10px;
      outlineline:none
      justify-content: center;
      align-items: center;
      background-color:#873ADF;;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
`;