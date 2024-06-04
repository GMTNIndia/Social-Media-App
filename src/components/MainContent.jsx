
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import manish from './manish.jpg';
import like from './heart.png';
import comment from './chat-bubble.png';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function MainContent() {
  const [content, setContent] = useState('');
  // const [image, setImage] = useState(null);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(manish); 
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState({});
  const [showMenu, setShowMenu] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/photo/retrieve/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data.profile_photo) {
          setProfileImage(response.data.profile_photo);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error.message);
      }
    };
  
    fetchProfileImage();
  }, []);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      console.error('Access token missing');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:8000/posts/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const postsData = await Promise.all(
        response.data.map(async (post) => {
          const likesResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/likes/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const commentsResponse = await axios.get(`http://localhost:8000/api/posts/${post.id}/comments/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return {
            ...post,
            likes: likesResponse.data.length,
            comments: commentsResponse.data.length,
          };
        })
      );
  
      // Sort posts by created_on date in descending order
      const sortedPosts = postsData.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
      
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      console.error('User not logged in or access token missing');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user', userId);

      const response = await axios.post(
        'http://127.0.0.1:8000/posts/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Post created successfully:', response.data);
      setContent('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleLike = async (postId) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/likes/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Post liked successfully:', response.data);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error.message);
    }
  };
  const handleComment = async (postId) => {
    const accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments/`,
        { content: newComment, post: postId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Comment added successfully:', response.data);
      setNewComment(''); // Clear the input box after posting a comment
      setImage(null); // Clear the image selector after posting a comment
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const toggleComments = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  const handleMenuToggle = (postId) => {
    setShowMenu((prevShowMenu) => (prevShowMenu === postId ? null : postId));
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setEditContent(post.content);
    setEditImage(null);
    setModalIsOpen(true);
    setShowMenu(null);
  };

  const handleUpdatePost = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || !selectedPost) {
      console.error('Access token or selected post missing');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', editContent);
      formData.append('user', userId);
      if (editImage) {
        formData.append('image', editImage);
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/posts/${selectedPost.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setPosts(posts.map(post => (post.id === selectedPost.id ? response.data : post)));
      setModalIsOpen(false);
      setSelectedPost(null);
      console.log('Post updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleDeletePost = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || !selectedPost) {
      console.error('Access token or selected post missing');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/posts/${selectedPost.id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPosts(posts.filter(post => post.id !== selectedPost.id));
      console.log('Post deleted successfully');
      setShowMenu(null);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
  <div className="w-full md:w-2/4 mt-28 p-4 mx-auto">
       {/* <Notifications /> */}
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

      {posts.map(post => (
        <div key={post.id} className="bg-white shadow rounded p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
            //  src={}
            // src={profileImage}
           src={`http://127.0.0.1:8000${post.profile_photo}`} 
              // src={`http://localhost:8000/${post.profile_photo}`}
            
              className="rounded-full w-10 h-10" />
             
              <div className="ml-2">
                <h3 className="text-sm font-semibold">{post.user.username}</h3>
                <p className="text-xs text-gray-600">{new Date(post.created_on).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => handleMenuToggle(post.id)} className="text-black">
                &#x22EE;
              </button>
              {showMenu === post.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      handleDeletePost();
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          {post.image && <img src={`http://127.0.0.1:8000${post.image}`} alt="Post" className="mt-4 rounded w-full" />}
          <p className="mt-5 text-sm">{post.content}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button onClick={() => handleLike(post.id)} className="mr-2">
                <img src={like} alt="Like" className="w-5 h-5" />
              </button>
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center">
              <button onClick={() => toggleComments(post.id)} className="mr-2">
                <img src={comment} alt="Comment" className="w-5 h-5" />
              </button>
              <span>{post.comments}</span>
            </div>
          </div>
          {showComments[post.id] && (
            <div className="mt-4">
              <Comments postId={post.id} />
              <textarea
                className="w-full border rounded p-2 mt-2"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button className="bg-gray-600 text-white px-4 py-2 mt-2 rounded" onClick={() => handleComment(post.id)}>
                Comment
              </button>
            </div>
          )}
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Post Modal"
      >
        <h2>Edit Post</h2>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Edit your post content"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
        <input type="file" onChange={(e) => setEditImage(e.target.files[0])} />
        <button className="bg-gray-600 text-white px-4 py-2 mt-2 rounded" onClick={handleUpdatePost}>
          Update
        </button>
        <button className="bg-red-600 text-white px-4 py-2 mt-2 rounded" onClick={() => setModalIsOpen(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  );
}

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token missing');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}/comments/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="bg-gray-100 p-2 rounded mt-2">
          {/* <p className="text-">{comment.username}</p> */}
          <p className="text-">{comment.user.username}</p>
          {/* <p className="text-xs text-gray-600">{new Date().toLocaleTimeString()}</p> */}
          <p className="text-sm mt-1">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
