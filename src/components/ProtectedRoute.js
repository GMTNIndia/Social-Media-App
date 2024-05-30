// // ProtectedRoute.js
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { isAuthenticated } from './authService'; // Import your authentication service

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// export default ProtectedRoute;
// ProtectedRoute.js
// import React from 'react';
// import { Route, useHistory } from 'react-router-dom';
// import { isAuthenticated } from './authService'; // Import your authentication service

// const ProtectedRoute = ({ component: Component, redirectTo, ...rest }) => {
//   const history = useHistory();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           redirectTo ? history.push(redirectTo) : history.push('/login')
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
import React from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from './authService'; // Import your authentication service

const ProtectedRoute = ({ component: Component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          redirectTo ? props.history.push(redirectTo) : props.history.push('/login')
        )
      }
    />
  );
};

export default ProtectedRoute;

