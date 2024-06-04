// authService.js
export const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  export const logout = () => {
    localStorage.removeItem('isLoggedIn');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };
  // AuthService.js

// class AuthService {
//   // Simulated login function
//   login() {
//     localStorage.setItem('isLoggedIn', 'true');
//   }

//   // Simulated logout function
//   logout() {
//     localStorage.removeItem('isLoggedIn');
//   }

//   // Function to check if the user is authenticated
//   isAuthenticated() {
//     return localStorage.getItem('isLoggedIn') === 'true';
//   }
// }

// export default new AuthService();
