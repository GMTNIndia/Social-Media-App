// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import defaultImage from "../components/images/dimg.jpg";


// // Utility function to calculate elapsed time
// const getElapsedTime = (timestamp) => {
//   const now = new Date();
//   const seconds = Math.floor((now - timestamp) / 1000);
//   if (seconds < 60) return `${seconds} sec ago`;
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes} min ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hr ago`;
//   const days = Math.floor(hours / 24);
//   return `${days} days ago`;
// };

// // Component to display each person in the list
// function Person({ profile_photo, username, userId, status, onClick, isSelected }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex gap-5 justify-between mt-5 w-full cursor-pointer ${isSelected ? "bg-gray-200" : ""}`}
//     >
//       <div className="flex gap-2.5 text-xs font-medium text-neutral-900">
//         <img
//           loading="lazy"
//           src={profile_photo ? `http://127.0.0.1:8000${profile_photo}` : defaultImage}
//           alt={`Profile of ${username}`}
//           className="rounded-full shrink-0 w-8 aspect-square" 
//         />
//         <div className="my-auto">{username}</div>
//       </div>
//       <div className={`my-auto text-xs font-semibold ${status === "Active Now" ? "text-green-500" : "text-zinc-600"}`}>
//         {status}
//       </div>
//     </div>
//   );
// }


// // Component to display each message
// function Message({ imgSrc, message, timestamp, Sender, Receiver, userId }) {
//   const isSentByCurrentUser = Sender === userId;

//   return (
//     <div className={`flex items-start mt-3 ${isSentByCurrentUser ? "justify-start" : "justify-end"}`}>
//       <div className={`flex flex-col mt-4 ${isSentByCurrentUser ? "items-end" : "items-start"} w-fit`}>
//         <div className={`px-5 py-2.5 text-xs leading-4 ${isSentByCurrentUser ? "bg-zinc-600 text-white rounded-tl-xl rounded-br-xl rounded-bl-xl" : "bg-purple-600 text-white rounded-tr-xl rounded-bl-xl rounded-br-xl"} shadow-sm`}>
//           {message}
//         </div>
//         <div className={`mt-1 text-xs ${isSentByCurrentUser ? "text-zinc-600 self-end" : "text-gray-600 self-start"}`}>{timestamp}</div>
//         {isSentByCurrentUser && <div className="text-xs text-gray-600 mt-1">{Receiver}</div>}
//       </div>
//       {!isSentByCurrentUser && (
//         <img loading="lazy" src={imgSrc} alt="" className="w-8 aspect-square rounded-full" />
//       )}
//     </div>
//   );
// }


// function ChatPage() {
//   const [people, setPeople] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const token = localStorage.getItem('accessToken');
//   const userId = localStorage.getItem('userId');
//   let ws = null;

//   useEffect(() => {
//     // Fetch followed people from the API
//     axios.get('http://127.0.0.1:8000/all-users/', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setPeople(response.data);
//       if (response.data.length > 0) {
//         setSelectedPerson(response.data[0]);
//         fetchMessages(userId, response.data[0].id);
//         setupWebSocket(response.data[0].id);
//       }
//     })
//     .catch(error => {
//       console.error('There was an error fetching the users!', error);
//     });
//   }, [token, userId]);

//   const fetchMessages = (user_id, partner_id) => {
//     axios.get(`http://127.0.0.1:8000/chat/${user_id}/${partner_id}/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setMessages(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the messages!', error);
//     });
//   };

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedPerson) return;

//     const newMsg = {
//       sender: userId,
//       receiver: selectedPerson.id,
//       message: newMessage
//     };

//     axios.post('http://127.0.0.1:8000/send-message/', newMsg, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setMessages([...messages, response.data]);
//       setNewMessage("");
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify(newMsg));
//       }
//     })
//     .catch(error => {
//       console.error('There was an error sending the message!', error);
//     });
//   };

//   const setupWebSocket = (user_id) => {
//     ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user_id}/`);

//     ws.onopen = function () {
//       console.log("WebSocket connected");
//     };

//     ws.onmessage = function (event) {
//       const data = JSON.parse(event.data);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           message: `${data.sender}: ${data.message}`,
//           sender: data.sender,
//           timestamp: new Date().toISOString()
//         }
//       ]);
//     };

//     ws.onclose = function () {
//       console.error("WebSocket closed unexpectedly");
//     };
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) => ({
//           ...msg,
//           time: getElapsedTime(new Date(msg.timestamp)),
//         }))
//       );
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPeople((prevPeople) =>
//         prevPeople.map((person) => ({
//           ...person,
//           status: getElapsedTime(new Date(person.timestamp)),
//         }))
//       );
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   const [isTyping, setIsTyping] = useState(false);
//   const TYPING_TIMEOUT = 2000; // 2 seconds

//   useEffect(() => {
//     let typingTimeout;

//     const handleTyping = () => {
//       setIsTyping(true);
//       clearTimeout(typingTimeout);
//       typingTimeout = setTimeout(() => {
//         setIsTyping(false);
//       }, TYPING_TIMEOUT);
//     };

//     const handleClearTyping = () => {
//       clearTimeout(typingTimeout);
//       setIsTyping(false);
//     };

//     if (newMessage.trim()) {
//       handleTyping();
//     } else {
//       handleClearTyping();
//     }

//     return () => clearTimeout(typingTimeout);
//   }, [newMessage]);

//   return (
//     <div className="flex flex-col  pb-20 bg-gray-100">
//       <main className="flex flex-col self-center mt-[120px] w-full max-w-[1140px] max-md:max-w-full">
//         <section className="max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//             <aside className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col px-4 py-5 mx-auto w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:mt-5">
//                 <div className="text-sm font-semibold text-neutral-900">
//                   People
//                 </div>
//                 {people.map((person) => (
//                   <div
//                     key={person.id}
//                     onClick={() => {
//                       setSelectedPerson(person);
//                       fetchMessages(userId, person.id);
//                     }}
//                     className={`cursor-pointer ${selectedPerson && selectedPerson.id === person.id ? "bg-gray-200" : ""}`}
//                   >
//                     <Person
//                      imgSrc={person.profile_photo ? `http://127.0.0.1:8000${person.profile_photo}` : defaultImage}
//                       username={person.username}
//                       userId={person.id}
//                       status={person.status}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </aside>
//             <section className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col grow px-6 py-8 w-full font-semibold bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:px-5 max-md:mt-5 max-md:max-w-full">
//                 {messages.map((message, index) => (
//                   <Message
//                     key={message}
//                     imgSrc={message.profile_photo ? `http://127.0.0.1:8000${message.profile_photo}` : defaultImage}
//                     message={message.message}
//                     timestamp={getElapsedTime(new Date(message.timestamp))}
//                     Sender={message.sender} // use 'sender' instead of 'Sender'
//                     Receiver={message.receiver}
//                     userId={userId}
//                   />
//                 ))}
//               </div>
//             </section>
//           </div>
//         </section>
//         <section className="flex flex-col self-end px-6 py-5 mt-3.5 max-w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 w-[850px] max-md:px-5">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="messageInput" className="sr-only">
//               What do you want to Say ?
//             </label>
//             <input
//               type="text"
//               id="messageInput"
//               placeholder={isTyping ? "Typing..." : "What do you want to Say ?"}
//               aria-label="What do you want to Say ?"
//               className="justify-center items-start p-3 text-xs font-medium rounded-md bg-zinc-200 text-zinc-500 max-md:pr-5 max-md:max-w-full w-full"
//               value={newMessage}
//               onChange={handleInputChange}
//             />
//             <button
//               type="submit"
//               className="justify-center self-start px-5 py-4 mt-5 text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
//             >
//               Send
//             </button>
//           </form>
//         </section>
//       </main>
   
//     </div>
//   );
// }
// export default ChatPage;




import React, { useState, useEffect } from "react";
import axios from 'axios';


// Utility function to calculate elapsed time
const getElapsedTime = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - timestamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

// Component to display each person in the list
function Person({ username, userId, status, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-5 justify-between mt-5 w-full cursor-pointer ${isSelected ? "bg-gray-200" : ""}`}
    >
      <div className="flex gap-2.5 text-xs font-medium text-neutral-900">
        <div className="my-auto">{username}</div>
      </div>
      <div className={`my-auto text-xs font-semibold ${status === "Active Now" ? "text-green-500" : "text-zinc-600"}`}>
        {status}
      </div>
    </div>
  );
}

// old
// Component to display each message
// function Message({ message, timestamp, Sender, Receiver, userId }) {
//   const isSentByCurrentUser = Sender === userId;

//   return (
//     <div className={`flex items-start mt-3 ${isSentByCurrentUser ? "justify-start" : "justify-end"}`}>
//       <div className={`flex flex-col mt-4 ${isSentByCurrentUser ? "items-end" : "items-start"} w-fit`}>
//         <div className={`px-5 py-2.5 text-xs leading-4 ${isSentByCurrentUser ? "bg-zinc-600 text-white rounded-tl-xl rounded-br-xl rounded-bl-xl" : "bg-purple-600 text-white rounded-tr-xl rounded-bl-xl rounded-br-xl"} shadow-sm`}>
//           {message}
//         </div>
//         <div className={`mt-1 text-xs ${isSentByCurrentUser ? "text-zinc-600 self-end" : "text-gray-600 self-start"}`}>{timestamp}</div>
//         {isSentByCurrentUser && <div className="text-xs text-gray-600 mt-1">{Receiver}</div>}
//       </div>
//     </div>
//   );
// }


// function ChatPage() {
//   const [people, setPeople] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const token = localStorage.getItem('accessToken');
//   const userId = localStorage.getItem('userId');
//   let ws = null;

//   useEffect(() => {
//     // Fetch followed people from the API
//     axios.get('http://127.0.0.1:8000/all-users/', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setPeople(response.data);
//       if (response.data.length > 0) {
//         setSelectedPerson(response.data[0]);
//         fetchMessages(userId, response.data[0].id);
//         setupWebSocket(response.data[0].id);
//       }
//     })
//     .catch(error => {
//       console.error('There was an error fetching the users!', error);
//     });
//   }, [token, userId]);

//   const fetchMessages = (user_id, partner_id) => {
//     axios.get(`http://127.0.0.1:8000/chat/${user_id}/${partner_id}/`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setMessages(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the messages!', error);
//     });
//   };

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedPerson) return;

//     const newMsg = {
//       sender: userId,
//       receiver: selectedPerson.id,
//       message: newMessage
//     };

//     axios.post('http://127.0.0.1:8000/send-message/', newMsg, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       setMessages([...messages, response.data]);
//       setNewMessage("");
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify(newMsg));
//       }
//     })
//     .catch(error => {
//       console.error('There was an error sending the message!', error);
//     });
//   };

//   const setupWebSocket = (user_id) => {
//     ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user_id}/`);

//     ws.onopen = function () {
//       console.log("WebSocket connected");
//     };

//     ws.onmessage = function (event) {
//       const data = JSON.parse(event.data);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           message: `${data.sender}: ${data.message}`,
//           sender: data.sender,
//           timestamp: new Date().toISOString()
//         }
//       ]);
//     };

//     ws.onclose = function () {
//       console.error("WebSocket closed unexpectedly");
//     };
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) => ({
//           ...msg,
//           time: getElapsedTime(new Date(msg.timestamp)),
//         }))
//       );
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPeople((prevPeople) =>
//         prevPeople.map((person) => ({
//           ...person,
//           status: getElapsedTime(new Date(person.timestamp)),
//         }))
//       );
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   const [isTyping, setIsTyping] = useState(false);
//   const TYPING_TIMEOUT = 2000; // 2 seconds

//   useEffect(() => {
//     let typingTimeout;

//     const handleTyping = () => {
//       setIsTyping(true);
//       clearTimeout(typingTimeout);
//       typingTimeout = setTimeout(() => {
//         setIsTyping(false);
//       }, TYPING_TIMEOUT);
//     };

//     const handleClearTyping = () => {
//       clearTimeout(typingTimeout);
//       setIsTyping(false);
//     };

//     if (newMessage.trim()) {
//       handleTyping();
//     } else {
//       handleClearTyping();
//     }

//     return () => clearTimeout(typingTimeout);
//   }, [newMessage]);

//   return (
//     <div className="flex flex-col  pb-20 bg-gray-100">
//       <main className="flex flex-col self-center mt-[120px] w-full max-w-[1140px] max-md:max-w-full">
//         <section className="max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//             <aside className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col px-4 py-5 mx-auto w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:mt-5">
//                 <div className="text-sm font-semibold text-neutral-900">
//                   People
//                 </div>
//                 {people.map((person) => (
//                   <div
//                     key={person.id}
//                     onClick={() => {
//                       setSelectedPerson(person);
//                       fetchMessages(userId, person.id);
//                     }}
//                     className={`cursor-pointer ${selectedPerson && selectedPerson.id === person.id ? "bg-gray-200" : ""}`}
//                   >
//                     <Person
//                       username={person.username}
//                       userId={person.id}
//                       status={person.status}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </aside>
//             <section className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col grow px-6 py-8 w-full font-semibold bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:px-5 max-md:mt-5">
//                 {messages.map((message, index) => (
//                   <Message
//                     key={message}
//                     message={message.message}
//                     timestamp={getElapsedTime(new Date(message.timestamp))}
//                     Sender={message.sender} // use 'sender' instead of 'Sender'
//                     Receiver={message.receiver}
//                     userId={userId}
//                   />
//                 ))}
//               </div>
//             </section>
//           </div>
//         </section>
//         <section className="flex flex-col self-end px-6 py-5 mt-3.5 max-w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 w-[850px] max-md:px-5">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="messageInput" className="sr-only">
//               What do you want to Say ?
//             </label>
//             <input
//               type="text"
//               id="messageInput"
//               placeholder={isTyping ? "Typing..." : "What do you want to Say ?"}
//               aria-label="What do you want to Say ?"
//               className="justify-center items-start p-3 text-xs font-medium rounded-md bg-zinc-200 text-zinc-500 max-md:pr-5 max-md:max-w-full w-full"
//               value={newMessage}
//               onChange={handleInputChange}
//             />
//             <button
//               type="submit"
//               className="justify-center self-start px-5 py-4 mt-5 text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
//             >
//               Send
//             </button>
//           </form>
//         </section>
//       </main>
   
//     </div>
//   );
// }
// export default ChatPage;


