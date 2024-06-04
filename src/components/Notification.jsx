import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token missing');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const handleReadNotification = async (notificationId) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token missing');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/notifications/${notificationId}/read/`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the notifications state to remove the read notification
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  return (
    <div className="notifications">
      {notifications.map(notification => (
        <div key={notification.id} className="notification bg-gray-100 p-2 rounded mt-2">
          <p className="text-sm">{notification.message}</p>
          <button onClick={() => handleReadNotification(notification.id)} className="bg-gray-600 text-white px-2 py-1 mt-2 rounded">
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
