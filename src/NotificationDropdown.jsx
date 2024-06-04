const notificationsData = [
    { id: 1, message: "New message from John" },
    { id: 2, message: "You have a meeting at 10:00 AM" },
    { id: 3, message: "Reminder: Pay your electricity bill" }
  ];
  
  // Function to fetch notifications (simulated asynchronous operation)
  export const getNotifications = () => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve(notificationsData); // Resolve with notifications data
      }, 1000); // Simulate 1 second delay
    });
  };