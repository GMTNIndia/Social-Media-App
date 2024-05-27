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
  