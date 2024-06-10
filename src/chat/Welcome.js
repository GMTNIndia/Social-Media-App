// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Robot from "./robot.gif";
// export default function Welcome() {
//   const [userName, setUserName] = useState("");
//   useEffect(async () => {
//     setUserName(
//       await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       ).username
//     );
//   }, []);
//   return (
//     <Container>
//       <img src={Robot} alt="" />
//       <h1>
//         Welcome, <span>{userName}!</span>
//       </h1>
//       <h3>Please select a chat to Start messaging.</h3>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Robot from "../robot.gif";

// export default function Welcome() {
//   const [userName, setUserName] = useState("User"); // Default username

//   useEffect(() => {
//     // Simulate fetching user data
//     const fetchUserName = async () => {
//       // Replace this with actual user data fetching logic
//       const user = { username: "User" }; // Placeholder user
//       setUserName(user.username);
//     };

//     fetchUserName();
//   }, []);

//   return (
//     <Container>
//       <img src={Robot} alt="" />
//       <h1>
//         Welcome, <span>{userName}!</span>
//       </h1>
//       <h3>Please select a chat to start messaging.</h3>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;



import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../asserts/logo.svg";

export default function Welcome() {
  const [userName, setUserName] = useState(""); // Default username

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  ${'' /* font-size:10px;
   */}
   font-weight: bold;
   border-left:2px solid #873ADF;;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
