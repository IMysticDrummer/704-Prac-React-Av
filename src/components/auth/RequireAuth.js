import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from './context';

/**
 * Doing authorisation control (must be loggedin). If not, this redirect to the login page
 * @param {{React.Component || html}} param0
 * @returns
 */
const RequireAuth = ({ children }) => {
  const { isLogged } = useLogin();
  const location = useLocation();
  if (!isLogged) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
      />
    );
  }
  return children;
};

export default RequireAuth;
