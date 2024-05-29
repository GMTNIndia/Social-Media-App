
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (username === '' || password === '') {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        // Assuming the response includes user_id along with access and refresh tokens
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userId', data.user.userId); // Store user ID in localStorage
        navigate('/');
      } else {
        setError(response.data.detail || 'Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* <Navbar /> */}
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="w-full md:w-2/4 p-4 md:ml-20">
          <div className="bg-white shadow rounded p-10">
            <h1 className="mb-2 font-bold text-base">Login</h1>
            <p>Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.</p>
            <p className="mt-5 font-semibold text-sm">Don't have an account? Click here to create one!</p>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-4 mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-3">Login</h2>
            <p className="text-center mb-4">
              Already have an account? <Link to={'/register'} className='text-purple-600 underline'>Sign up here</Link>
            </p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="items-right">
                <Link to="/forgot-password" className="text-sm text-purple-600 underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
