// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from './auth/Home';
// import Login from './auth/Login';
// import Register from './auth/Register';
// import Nopage from './auth/Nopage';
// import Navbar from './Navbar';
// import SearchBar from './components/SearchBar';
// import ChatWindow from './components/ChatWindow';
// import Notifications from './Notification';

// function App() {
//   return (
//    <div>
//     <BrowserRouter>
//     <Navbar/>
//     <Routes>
      
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/register" element={<Register/>} />
//         <Route path="*" element={<Nopage/>} />
//         <Route path="/search" element={<SearchBar/>} />
//         <Route path="/chat" element={<ChatWindow/>} />
//         <Route path="/notification" element={<Notifications/>} />
//     </Routes>
//   </BrowserRouter>
//   </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './auth/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Nopage from './auth/Nopage';
import Navbar from './Navbar';
import SearchBar from './components/SearchBar';
// import ChatWindow from './components/ChatWindow';
import Chat from './chat'
import Notifications from './Notification';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './auth/Forgetpassword';
import OtpVerificationPage from './auth/Otp';
import ResetPassword from './auth/Reset-password';
import Chatpage from './chat/chatpage';
import Contacts from './chat/Contact';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Nopage />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/search" element={<PrivateRoute element={<SearchBar />} />} />
          <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
          <Route path="/chatdetaile" element={<PrivateRoute element={<Chatpage/>} />} />
          <Route path="/notification" element={<PrivateRoute element={<Notifications />} />} />
          <Route path="/password-reset-confirm" element={<ResetPassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/otp-verify" element={<OtpVerificationPage/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;