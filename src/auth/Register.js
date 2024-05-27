// import React from 'react';
// import { Link } from 'react-router-dom';

// function Register() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-3">Sign up</h2>
//         <p className="text-center mb-4">
//           Already have an account? <Link to={'/login'} className='text-purple-600 underline'>Login here</Link>
//         </p>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="username">Full Name</label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter your full name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
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
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="keepSignedIn"
//               className="mr-2"
//             />
//             <label htmlFor="keepSignedIn" className="text-gray-700">Keep me signed in</label>
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
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Register() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-3">Sign up</h2>
//         <p className="text-center mb-4">
//           Already have an account? <Link to={'/login'} className='text-purple-600 underline'>Login here</Link>
//         </p>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
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
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="set_password">Confirm Password</label>
//             <input
//               type="password"
//               id="set_password"
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


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     set_password: '',
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
//     if (formData.password !== formData.set_password) {
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
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
//             <label className="block text-gray-700 mb-2" htmlFor="set_password">Confirm Password</label>
//             <input
//               type="password"
//               id="set_password"
//               value={formData.set_password}
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
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     set_password: '',
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
//     if (formData.password !== formData.set_password) {
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
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 pb-10">
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
//             <label className="block text-gray-700 mb-2" htmlFor="set_password">Confirm Password</label>
//             <input
//               type="password"
//               id="set_password"
//               value={formData.set_password}
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

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    set_password: '',
    mobile_number: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.set_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          mobile_number: formData.mobile_number
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12" >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-3">Sign up</h2>
        <p className="text-center mb-4">
          Already have an account? <Link to={'/login'} className='text-purple-600 underline'>Login here</Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="set_password">Confirm Password</label>
            <input
              type="password"
              id="set_password"
              value={formData.set_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              id="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
