
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import manish from './components/profile.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import './animation.css'; // Ensure you have this CSS file for custom animations

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
// // Update the fetchNotifications function in Notifications component

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const sortedNotifications = response.data.reverse(); // Reverse order to display new notifications first
//         setNotifications(sortedNotifications);
//         sortedNotifications.forEach(notification => {
//           localStorage.setItem('notification', notification.sender_id);
//           // localStorage.setItem(`notification_user_${notification.id}`, notification.user);
//           // localStorage.setItem(`${notification.id}`,notification.sender_id); // Store sender ID`notification_sender_${notification.id}`,
//         });
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setLoading(false);
//       }
//     };fetchNotifications();
//   }, []);

// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const sortedNotifications = response.data.reverse(); // Reverse order to display new notifications first
      
//       // Log notifications to verify profile_photo data
//       console.log('Fetched Notifications:', sortedNotifications);
      
//       setNotifications(sortedNotifications);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchNotifications();
// }, []);


//   const markAsRead = async (id) => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read/`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const updatedNotifications = notifications.map((notif) =>
//         notif.id === id ? { ...notif, read: true } : notif
//       );
//       setNotifications(updatedNotifications);
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const handleViewMessage = (chat_id) => {
//     // window.location.href = `/chat/${chat_id}`;  chatdetaile
//     window.location.href = `/chatdetaile`
//   };

//   return (
//     <div className='bg-gray-800'>
//       <h1 className="text-white text-center mb-4">All Notifications</h1>

//       <div className="container mx-auto p-10 mt-28">
//         {loading ? (
//           <p className="text-center">Loading notifications...</p>
//         ) : (
//           <ul className="space-y-4">
//             {notifications.map((notification, index) => (
//               <NotificationItem
//                 key={notification.id}
//                 notification={notification}
//                 markAsRead={markAsRead}
//                 handleViewMessage={handleViewMessage}
//                 index={index}
//               />
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// const NotificationItem = ({ notification, markAsRead, handleViewMessage, index }) => {
//   const getColor = () => {
//     if (notification.type === 'like') {
//       return 'border-yellow-500'; // Yellow border for like notifications
//     } else if (notification.type === 'comment') {
//       return 'border-purple-500'; // Purple border for comment notifications
//     } else {
//       return notification.read ? 'border-green-500' : 'border-blue-500'; // Default colors
//     }
//   };

//   return (
//     <li
//       className={`p-4 border-l-4 w-80 text-center mx-auto flex items-center justify-between shadow-lg rounded bg-white ${getColor()} ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
//     >
//       <a href={notification.viewMessagesLink} className="flex items-center">
//         <img
//           src={notification.profile_photo ? `${notification.profile_photo}` : manish}
//           alt="Notification Image"
//           className="w-8 h-8 object-cover rounded-full mr-4"
//         />
//         <div className="text-left">
//           <p className="font-bold text-lg">{notification.title}</p>
//           <p className="text-base">{notification.message}</p>
//           {/* <p className="text-sm text-gray-500">User ID: {notification.user}</p> Displaying user ID */}
//           {/* <p className="text-sm text-gray-500">Sender ID: {notification.sender_id}</p> Displaying sender ID */}
//           {/* <p className="text-sm text-gray-500">Notification ID: {notification.id}</p> Displaying notification ID */}
//         </div>
//       </a>
//       {notification.notification_type === 'MSG' && (
//         <div className="ml-4">
//           <button className="text-blue-500 cursor-pointer" onClick={() => handleViewMessage(notification.chat_id)}>View</button>
//         </div>
//       )}
//       {!notification.read && (
//         <FontAwesomeIcon
//           icon={faCheckCircle}
//           className="text-blue-500 cursor-pointer ml-4"
//           onClick={() => markAsRead(notification.id)}
//         />
//       )}
//     </li>
//   );
// };

// export default Notifications;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import manish from './components/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './animation.css'; // Ensure you have this CSS file for custom animations

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
// Update the fetchNotifications function in Notifications component

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedNotifications = response.data.reverse(); // Reverse order to display new notifications first
        setNotifications(sortedNotifications);
        sortedNotifications.forEach(notification => {
          localStorage.setItem('notification', notification.sender_id);
          // localStorage.setItem(`notification_user_${notification.id}`, notification.user);
          // localStorage.setItem(`${notification.id}`,notification.sender_id); // Store sender ID`notification_sender_${notification.id}`,
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };fetchNotifications();
  }, []);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedNotifications = response.data.reverse(); // Reverse order to display new notifications first
      
      // Log notifications to verify profile_photo data
      console.log('Fetched Notifications:', sortedNotifications);
      
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, []);


  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read/`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNotifications = notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleViewMessage = (chat_id) => {
    // window.location.href = `/chat/${chat_id}/`;
    window.location.href = `/chatdetaile`;
  };

  return (
    <div className='bg-gray-800'>
      <h1 className="text-white text-center mb-4">All Notifications</h1>

      <div className="container mx-auto p-10 mt-28">
        {loading ? (
          <p className="text-center">Loading notifications...</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                markAsRead={markAsRead}
                handleViewMessage={handleViewMessage}
                index={index}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const NotificationItem = ({ notification, markAsRead, handleViewMessage, index }) => {
  const getColor = () => {
    if (notification.type === 'like') {
      return 'border-yellow-500'; // Yellow border for like notifications
    } else if (notification.type === 'comment') {
      return 'border-purple-500'; // Purple border for comment notifications
    } else {
      return notification.read ? 'border-green-500' : 'border-blue-500'; // Default colors
    }
  };

  return (
    <li
      className={`p-4 border-l-4 w-80 text-center mx-auto flex items-center justify-between shadow-lg rounded bg-white ${getColor()} ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
    >
      <a href={notification.viewMessagesLink} className="flex items-center">
        <img
          src={notification.profile_photo ? `${notification.profile_photo}` : manish}
          alt="Notification Image"
          className="w-8 h-8 object-cover rounded-full mr-4"
        />
        <div className="text-left">
          <p className="font-bold text-lg">{notification.title}</p>
          <p className="text-base">{notification.message}</p>
          {/* <p className="text-sm text-gray-500">User ID: {notification.user}</p> Displaying user ID */}
          {/* <p className="text-sm text-gray-500">Sender ID: {notification.sender_id}</p> Displaying sender ID */}
          {/* <p className="text-sm text-gray-500">Notification ID: {notification.id}</p> Displaying notification ID */}
        </div>
      </a>
      {notification.notification_type === 'MSG' && (
        <div className="ml-4">
          <button className="text-blue-500 cursor-pointer" onClick={() => handleViewMessage(notification.chat_id)}>View</button>
        </div>
      )}
      {!notification.read && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-blue-500 cursor-pointer ml-4"
          onClick={() => markAsRead(notification.id)}
        />
      )}
    </li>
  );
};

export default Notifications;




