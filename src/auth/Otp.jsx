// // OtpVerificationPage.js

// import React, { useState } from 'react';

// const OtpVerificationPage = () => {
//     const [otp, setOtp] = useState('');

//     const handleOtpChange = (e) => {
//         setOtp(e.target.value);
//     };

//     const handleVerifyOtp = (e) => {
//         e.preventDefault();
//         // Send OTP to backend for verification
//         // You can use fetch or axios to make a POST request to your backend API
//         fetch('http://127.0.0.1:8000/otp-verify/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ otp }),
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Handle successful verification
//                 console.log('OTP verified successfully');
//             } else {
//                 // Handle verification failure
//                 console.error('Failed to verify OTP');
//             }
//         })
//         .catch(error => {
//             console.error('Error occurred while verifying OTP', error);
//         });
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//          <h2 className="text-2xl font-bold text-center mb-3">Forgot Password</h2>
//           <form className="space-y-4"   onSubmit={handleVerifyOtp}> 
//             <label className="block text-gray-700 mb-2" htmlFor="username">Verify OTP</label>
//             <input
//               type="text"
//               id="username"
//               value={otp} onChange={handleOtpChange}
//               placeholder="Enter your username"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               required
//             />
//             {/* <button type="submit">Verify OTP</button> */}
//             <button
//                   type="submit"
//                   className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//                 >
//                   {/* Login */}
//                   Verify OTP
//                 </button>
//           </form>
//         </div>
//       </div>
        
        
//     );
// };

// export default OtpVerificationPage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve email from local storage when component mounts
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // Store OTP in local storage
        localStorage.setItem('otp', otp);
        // Send OTP and email to backend for verification
        fetch('http://127.0.0.1:8000/otp-verify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, email }), // Send email along with OTP for verification
        })
        .then(response => {
            if (response.ok) {
                // Handle successful verification
                console.log('OTP verified successfully');
            } else {
                // Handle verification failure
                console.error('Failed to verify OTP');
            }
        })
        .catch(error => {
            console.error('Error occurred while verifying OTP', error);
        });
    };

    // const handleVerifyOtp = (e) => {
    //     e.preventDefault();
    //     // Send OTP and email to backend for verification
    //     fetch('http://127.0.0.1:8000/otp-verify/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ otp, email }), // Send email along with OTP for verification
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             // Handle successful verification
    //             console.log('OTP verified successfully');
    //         } else {
    //             // Handle verification failure
    //             console.error('Failed to verify OTP');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error occurred while verifying OTP', error);
    //     });
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-8 pb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-3">Verify-Otp</h2>
                <form className="space-y-4" onSubmit={handleVerifyOtp}>
                    <label className="block text-gray-700 mb-2" htmlFor="otp">Verify OTP for {email}</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        onClick={() => window.location.href = '/password-reset-confirm'}
                    >
                        Verify OTP
                    </button>
                    <div className="items-right">
                <Link to="/forgot-password" className="text-sm text-purple-600 underline">
                  Back?
                </Link>
              </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerificationPage;
