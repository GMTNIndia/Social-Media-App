


import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ userId,currentChat }) {
  const [msg, setMsg] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`);
    setWs(websocket);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userId]);
  const sendChat = async (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      try {
        const newMsg = {
          sender: userId, // Assuming you have userId defined somewhere
          receiver: currentChat.id, // Define receiverId based on your logic
         
          message: msg,
        };
  
        const response = await fetch("http://127.0.0.1:8000/send-message/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(newMsg),
        });
        if (response.ok) {
          console.log("Message sent successfully!");
          setMsg("");
  
          // Send message through WebSocket for real-time updates
          if (ws) {
            ws.send(JSON.stringify(newMsg));
          }
        } else {
          console.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 95%;
  padding: 0 2rem;

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;


