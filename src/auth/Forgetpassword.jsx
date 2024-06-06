// import React, { useState } from 'react';
// import axios from 'axios';

// function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a request to the backend to initiate the password reset process
//       const response = await axios.post('http://127.0.0.1:8000/password-reset/', { email });
//       setMessage(response.data.message);
//       setError('');
//     } catch (error) {
//       setError('An error occurred. Please try again later.');
//       setMessage('');
//     }
//   };

//   return (
//     // <div>
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
//       <h2>Forgot Password</h2>
//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//     mobile_number: ''
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirm_password) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           first_name: formData.first_name,
//           last_name: formData.last_name,
//           email: formData.email,
//           password: formData.password,
//           confirm_password: formData.confirm_password,
//           mobile_number: formData.mobile_number
//         }),
//       });

//       if (response.ok) {
//         navigate('/login');
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-3">Sign up</h2>
//         <p className="text-center mb-4">
//           Already have an account? <Link to={'/login'} className='text-purple-600 underline'>Login here</Link>
//         </p>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="first_name">First Name</label>
//             <input
//               type="text"
//               id="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               placeholder="Enter your first name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="last_name">Last Name</label>
//             <input
//               type="text"
//               id="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               placeholder="Enter your last name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="confirm_password">Confirm Password</label>
//             <input
//               type="password"
//               id="confirm_password"
//               value={formData.confirm_password}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="mobile_number">Mobile Number</label>
//             <input
//               type="tel"
//               id="mobile_number"
//               value={formData.mobile_number}
//               onChange={handleChange}
//               placeholder="Enter your mobile number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//           >
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to initiate the password reset process
      const response = await axios.post('http://127.0.0.1:8000/password-reset/', { email });
      setMessage(response.data.message);
      setError('');
      localStorage.setItem('email', email);
      navigate('/otp-verify');
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
  };
  const handleSendOtp = () => {
    // Redirect to the OTP verification page
    navigate('/otp-verify');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* <h2>Forgot Password</h2>
       */}
       <h2 className="text-2xl font-bold text-center mb-3">Send OTP</h2>
     
{message && <p>{message}</p>}
 {error && <p>{error}</p>}
        {/* <h2 className="text-2xl font-bold text-center mb-3">Forgot Password</h2>
      */}
        <form className="space-y-4"  onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
            //   value={formData.email}
            //   onChange={handleChange}
             value={email}
             onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          {/* <button
        //   type="button"
        type="submit"
          className="w-full bg-purple-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={handleSendOtp}
        >
          Send OTP
        </button> */}
          
      
                 
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
          Send Otp
            {/* <Link to="/otp-verify">
           Send Otp
           </Link> */}
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}

export default Register;
