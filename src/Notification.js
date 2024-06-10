
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     const fetchNotifications = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             setNotifications(response.data);
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     const markAsRead = async (id) => {
//         try {
//             await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read/`, null, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             // Optionally update the notification state to reflect the read status
//             setNotifications(notifications.map(notification =>
//                 notification.id === id ? { ...notification, read: true } : notification
//             ));
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 mt-28">
//             <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//             {notifications.length === 0 ? (
//                 <p>No notifications available.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {notifications.map(notification => (
//                         <li
//                             key={notification.id}
//                             className={`p-4 border rounded ${notification.read ? 'bg-gray-200' : 'bg-white'}`}
//                         >
//                             <p className="font-bold">{notification.title}</p>
//                             <p>{notification.message}</p>
//                             {notification.content && <p>{notification.content}</p>}
//                             {!notification.read && (
//                                 <button
//                                     onClick={() => markAsRead(notification.id)}
//                                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                                 >
//                                     Mark as Read
//                                 </button>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Notifications;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     const fetchNotifications = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             setNotifications(response.data);
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     const markAsRead = async (id) => {
//         try {
//             await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read/`, null, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             setNotifications(notifications.map(notification =>
//                 notification.id === id ? { ...notification, read: true } : notification
//             ));
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     const viewMessage = () => {
//         window.location.href = '/chat/';
//     };

//     return (
//         <div className="container mx-auto p-4 mt-28">
//             <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//             {notifications.length === 0 ? (
//                 <p>No notifications available.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {notifications.map(notification => (
//                         <li
//                             key={notification.id}
//                             className={`p-4 border rounded ${notification.read ? 'bg-gray-200' : 'bg-white'}`}
//                         >
//                             <p className="font-bold">{notification.title}</p>
//                             <p>{notification.message}</p>
//                             {notification.content && <p>{notification.content}</p>}
//                             <div className="mt-2 space-x-2">
//                                 {!notification.read && (
//                                     <button
//                                         onClick={() => markAsRead(notification.id)}
//                                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                                     >
//                                         Mark as Read
//                                     </button>
//                                 )}
//                                 {notification.notification_type === 'MSG' && (
//                                     <button
//                                         onClick={viewMessage}
//                                         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//                                     >
//                                         View
//                                     </button>
//                                 )}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Notifications;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import manish from './components//profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './animation.css'; // Ensure you have this CSS file for custom animations

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    < div className='bg-gray-800'>
     <h1 className="text-white text-center mb-4">All Notifications</h1>

    <div className="container mx-auto p-10 mt-28 ">
  
      {loading ? (
        <p className="text-center">Loading notifications...</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              markAsRead={markAsRead}
              index={index}
            />
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

const NotificationItem = ({ notification, markAsRead, index }) => {
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
     <img
     src={notification.profile_photo ? `http://127.0.0.1:8000${notification.profile_photo}` : manish}
            // src={notification.image} // Assuming you have an image URL in your notification data
            alt="Notification Image"
            className="w-8 h-8 object-cover rounded-full mr-4"
          />
      <div className="text-left">
        <p className="font-bold text-lg">{notification.title}</p>
        <p className="text-base">{notification.message}</p>
      </div>
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

export default Notifications

