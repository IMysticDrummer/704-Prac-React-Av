import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../store/selectors';

/**
 * Doing authorisation control (must be loggedin). If not, this redirect to the login page
 * @param {{React.Component || html}} param0
 * @returns
 */
const RequireAuth = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
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
