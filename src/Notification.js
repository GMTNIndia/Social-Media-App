
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/notifications/${id}/read/`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const viewMessage = () => {
        window.location.href = '/chat/';
    };

    return (
        <div className="container mx-auto p-4 mt-28">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map(notification => (
                        <li
                            key={notification.id}
                            className={`p-4 border rounded ${notification.read ? 'bg-gray-200' : 'bg-white'}`}
                        >
                            <p className="font-bold">{notification.title}</p>
                            <p>{notification.message}</p>
                            {notification.content && <p>{notification.content}</p>}
                            <div className="mt-2 space-x-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                {notification.notification_type === 'MSG' && (
                                    <button
                                        onClick={viewMessage}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                    >
                                        View
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;

