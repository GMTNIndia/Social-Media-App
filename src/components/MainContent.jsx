import React, { useState } from 'react';
import axios from 'axios';
import manish from './manish.jpg';
import like from '../components/heart.png';
import comment from '../components/chat-bubble.png';

function MainContent() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/posts/',
        formData,
        {
          headers: {
            Authorization:`Bearer ${accessToken}`
            // 'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Post created successfully:', response.data);
      // Clear the content and image fields after successful post
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error.message);
      // Handle error
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="w-full md:w-2/4 p-4 mx-auto">
      <div className="bg-white shadow rounded p-4 mb-4">
        <textarea
          className="w-full border rounded p-2"
          placeholder="What are you thinking about?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="file" onChange={handleImageChange} />
        <button className="bg-gray-600 text-white px-4 py-2 mt-2 rounded" onClick={handleSubmit}>
          Post
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="flex items-center">
  <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
  <div className="flex flex-grow justify-between items-center ml-2">
    <div>
      <h3 className="text-sm font-semibold">Code With Manish</h3>
      <p className="text-xs text-gray-600">10 minutes ago</p>
    </div>
  </div>
</div>
 <img src="https://plus.unsplash.com/premium_photo-1715428084281-c13dc4337f23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D" alt="Post" className="w-full mt-2 rounded" />
        {/* <p className="mt-2 text-sm">This is a sample post description.</p> */}
        <div className="flex items-center mt-5">
          <img src={like} alt="Like" className="rounded-full w-5 h-5 mr-2" />
          <p className="mr-4">400 Like</p>
          <img src={comment} alt="Comment" className="rounded-full w-5 h-5 mr-2" />
          <p>200000 comment</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="flex items-center">
          <img src={manish} alt="Profile" className="rounded-full w-10 h-10" />
          <div className="ml-2">
            <h3 className="text-sm font-semibold">Code With Manish</h3>
            <p className="text-xs text-gray-600">10 minutes ago</p>
          </div>
        </div>
        <p className="mt-5 text-sm ">Hello, I am Manish Kumar. I am a passionate full stack developer.</p>
        <div className="flex items-center mt-2">
          <img src={like} alt="Like" className="rounded-full w-5 h-5 mr-2" />
          <p className="mr-4">400 Like</p>
          
           <img src={comment} alt="Comment" className="rounded-full w-5 h-5 mr-2" />
          <p>200000 comment</p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
