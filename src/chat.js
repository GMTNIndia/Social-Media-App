
// import React, { useEffect, useState, useRef  } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import ChatContainer from "./chat/Chatcontainer";
// import Contacts from "./chat/Contact";
// import Welcome from "./chat/Welcome";

// export default function Chat() {
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(null); // Initially null
//   const ws = useRef(null);
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchContacts(token);
//       // initializeWebSocket(token);
//     }
//   }, [navigate]);

//   const fetchContacts = async (token) => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/all-users/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setContacts(data);
//       console.log(data)
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   // const initializeWebSocket = (token) => {
//   //   const userId = localStorage.getItem("userId");
//   //   if (userId) {
//   //     const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`, [
//   //       `Bearer ${token}`,
//   //     ]);

//   //     ws.onopen = () => {
//   //       console.log("WebSocket connection established");
//   //     };

//   //     ws.onmessage = (event) => {
//   //       const message = JSON.parse(event.data);
//   //       console.log("Received message:", message);
//   //       // Handle the incoming message and update the chat
//   //     };

//   //     ws.onclose = () => {
//   //       console.log("WebSocket connection closed");
//   //     };

//   //     ws.onerror = (error) => {
//   //       console.error("WebSocket error:", error);
//   //     };
//   //   }
//   // };

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <>
//       <Container className="mt-32 p-4 mx-auto">
//         {/* // <>changeChat={handleChatChange}  */}
//         <div className="container">
//           <Contacts contacts={contacts}  changeChat={handleChatChange}/>
//           {currentChat === undefined ? (
//             <Welcome />
//           ) : (
//             <ChatContainer  currentChat={currentChat}/>
//             // currentChat={currentChat}
//           )}
//         </div>
//       </Container>
//     </>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "./chat/Chatcontainer";
import Contacts from "./chat/Contact";
import Welcome from "./chat/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const ws = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchContacts(token);
      // initializeWebSocket(token);
    }
  }, [navigate]);

  const fetchContacts = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/all-users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setContacts(data);
      console.log("Contacts:", data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const initializeWebSocket = (token) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`, [
        `Bearer ${token}`,
      ]);

      ws.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        // Handle the incoming message and update the chat
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  };

  const fetchAllMessages = async (userId, personId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:8000/chat/${userId}/${personId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("All messages:", data);
      // Handle the received messages, e.g., update state or display messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (message) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/send-message/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log("Message sent:", data);
      // Optionally handle response data, e.g., update state or show a success message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container className="mt-32 p-4 mx-auto h-full">
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} />}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: white;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
