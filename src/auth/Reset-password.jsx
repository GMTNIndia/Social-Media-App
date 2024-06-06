// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Resetpage() {
//   const [formData, setFormData] = useState({

//     email: '',
//     password: '',
//     confirm_password: '',
//     mobile_number: '',
//     top:'',
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
//               value={formData.top}
//               onChange={handleChange}
//               placeholder="Enter your otp number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//           >
//             Reset password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default  Resetpage;





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function ResetPassword() {
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: '',
//     new_password: '',
//     confirm_password: ''
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
//     if (formData.new_password !== formData.confirm_password) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       // Send reset password request to the backend API
//       // Include formData.email, formData.otp, formData.new_password
//       // Handle the response accordingly
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-3">Reset Password</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
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
//             <label className="block text-gray-700 mb-2" htmlFor="otp">OTP</label>
//             <input
//               type="text"
//               id="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="new_password">New Password</label>
//             <input
//               type="password"
//               id="new_password"
//               value={formData.new_password}
//               onChange={handleChange}
//               placeholder="Enter your new password"
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
//               placeholder="Confirm your new password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function ResetPassword() {
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: '',
//     new_password: '',
//     confirm_password: ''
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
//     if (formData.new_password !== formData.confirm_password) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:8000/password-reset-confirm/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           otp: formData.otp,
//           new_password: formData.new_password,
//         }),
//       });

//       if (response.ok) {
//         navigate('/login'); // Redirect to login page after successful password reset
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Password reset failed');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-3">Reset Password</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
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
//             <label className="block text-gray-700 mb-2" htmlFor="otp">OTP</label>
//             <input
//               type="text"
//               id="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="new_password">New Password</label>
//             <input
//               type="password"
//               id="new_password"
//               value={formData.new_password}
//               onChange={handleChange}
//               placeholder="Enter your new password"
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
//               placeholder="Confirm your new password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;





import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    new_password: '',
    confirm_password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load email and otp from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedOtp = localStorage.getItem('otp');
    if (storedEmail && storedOtp) {
      setFormData(prevData => ({
        ...prevData,
        email: storedEmail,
        otp: storedOtp
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/password-reset-confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
        }),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful password reset
      } else {
        const data = await response.json();
        setError(data.message || 'Password reset failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-3">Reset Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={() => window.location.href = '/login'}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
