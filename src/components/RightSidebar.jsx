import React, { useState } from 'react';
import axios from 'axios';
import manish from '../components/manish.jpg';
import Edit from '../components/Edit.png';
import FileUploader from "./Drag";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', image);

      // Make an API request to update the profile picture
      const response = await axios.put(
        'http://127.0.0.1:8000/api/profile/photo/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming you have a token stored in localStorage for authentication
          },
        }
      );

      console.log('Profile picture updated successfully:', response.data);
     
    } catch (error) {
    
      console.error('Error updating profile picture:', error.message);
         
    }
  };

  return (
    <div className="w-full md:w-1/4 p-4">
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={manish}
              alt="Profile"
              className="rounded-full h-40 w-40 overflow-hidden"
              onClick={() => setShowModal(true)}
              style={{ cursor: 'pointer' }}
            />
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-purple-500 rounded-full p-1">
              <img
                src={Edit}
                alt="Edit Icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setShowModal(true)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
        
        {/* Modal */}
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="font-sans text-lg font-semibold leading-4 text-center w-full">
                      Upload Profile Picture
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black font-semibold">×</span>
                    </button>
                  </div>
                  <div className="relative p-6 flex flex-row items-center">
                    <img
                      src={manish}
                      alt="Your Image Alt Text"
                      className="mr-4 max-w-[40%] max-h-[200px]"
                    />
                    <div className="text-blueGray-500 text-lg leading-relaxed">
                      <div className="bg-gray-100 flex items-center justify-center">
                        <FileUploader onChange={handleImageChange} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-purple-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {/* End of modal */}
        <h2 className="text-center mt-5 text-lg font-semibold">Code With Manish</h2>
        <div className="flex justify-between space-x-4 mt-4">
          <p className="text-sm text-gray-600">50 Followers</p>
          <p className="text-sm text-gray-600">2 Posts</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


























