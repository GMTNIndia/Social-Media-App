// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// // import Logo from "../assets/logo.svg";

// export default function Contacts({ contacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);
//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     setCurrentUserName(data.username);
//     setCurrentUserImage(data.avatarImage);
//   }, []);
//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//   };
//   return (
//     <>
//       {currentUserImage && currentUserImage && (
//         <Container>
//           <div className="brand">
//             {/* <img src={Logo} alt="logo" /> */}
//             <h3>All User</h3>
//           </div>
//           <div className="contacts">
//             {contacts.map((contact, index) => {
//               return (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       src={`data:image/svg+xml;base64,${contact.avatarImage}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.username}</h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 src={`data:image/svg+xml;base64,${currentUserImage}`}
//                 alt="avatar"
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//     .selected {
//       background-color: #9a86f3;
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;



// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// // import Logo from "../assets/logo.svg";

// export default function Contacts({ contacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState("");
//   const [currentUserImage, setCurrentUserImage] = useState("");
//   const [currentSelected, setCurrentSelected] = useState(undefined);
  

//   const [userName, setUserName] = useState(""); // Default username

//   useEffect(() => {
//     // Retrieve username from localStorage
//     const storedUserName = localStorage.getItem("username");
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//   }, []);


//   useEffect(() => {
//     const fetchData = async () => {
//       // Simulating data fetching
//       const data = {
//         username: "John Doe",
//         avatarImage: "base64encodedImageData"
//       };
//       setCurrentUserName(data.username);
//       setCurrentUserImage(data.avatarImage);
//     };

//     fetchData();
//   }, []);

//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//   };

//   return (
//     <>
//       {currentUserImage && (
//         <Container>
//           <div className="brand">
            
//             <h3>All User</h3>
//           </div>
//           <div className="contacts">
//             {contacts.map((contact, index) => (
//               <div
//                 key={contact._id}
//                 className={`contact ${index === currentSelected ? "selected" : ""}`}
//                 onClick={() => changeCurrentChat(index, contact)}
//               >
//                 <div className=" username ">
//                   <h3>{contact.username}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="current-user">
        
//             <div className="username">
//               {/* <h2>{currentUserName}</h2> */}
              
//               <h2>{userName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//       {/* You can add a loading state or component here */}
//     </>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   border-right:2px solid #25D366;
//   ${'' /* background-color: #080420; */}
//   background-color:white;
//   ${'' /* color:black */}
//   ${'' /* border-right:2px; */}
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     ${'' /* background-color:#25D366;; */}
//     color:black ;
//     font-weight:bold;
   
//     h3 {
//       color: black;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     ${'' /* display: flex; */}
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     ${'' /* border-right:2px; */}
//     ${'' /* color:black; */}

//     ${'' /* background-color: black; */}
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         ${'' /* background-color: #ffffff39; */}
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       ${'' /* background-color:#FF69B4;; */}
//       ${'' /* background-color: ;  */}
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: black;
//           font-weight:bold;
//           ${'' /* background-color: grey; */}
//         }
//       }
//     }
//     .selected {
//       background-color: #25D366;
//     }
//   }

//   .current-user {
//     background-color:#25D366;;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;

//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;



import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [userName, setUserName] = useState(""); // Default username

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating data fetching
      const data = {
        username: "John Doe",
        avatarImage: "base64encodedImageData",
      };
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <Container>
          <div className="brand">
            <h3>All User</h3>
          </div>
          <div className="contacts mt">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="username">
              <h2>{userName}</h2>
            </div>
          </div>
        </Container>
      )}
      {/* You can add a loading state or component here */}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  border-right: 2px solid #873ADF;
  border-left: 2px solid #873ADF;
  background-color: white;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: bold;
    background-color:#873ADF;

    h3 {
      color: black;
      text-transform: uppercase;
      ${'' /* background-color:#724D9E */}
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // Center the contacts vertically
    overflow: auto;
    gap: 0.8rem;
    padding-top:8rem;
    &::-webkit-scrollbar {
      width: 0.1rem;

      &-thumb {
        background-color: green;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }

    .contact {
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center; // Center the individual contact content
      transition: 0.5s ease-in-out;

      .username {
        h3 {
          color: black;
          font-weight: bold;
        }
      }
    }

    .selected {
      background-color: #724D9E;
    }
  }

  .current-user {
    background-color: #873ADF;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
