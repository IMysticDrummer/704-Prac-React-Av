import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authLogout } from '../../store/actions';
import { getIsLogged } from '../../store/selectors';
import { Button } from '../common/Button';
import ConfirmElement from '../common/ConfirmElement';

import './Header.css';

/**
 * Returns the Header component with a **title**
 * @param {String} param0
 * @returns
 */
const Header = ({ title }) => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const [logoutRequired, setLogoutRequired] = useState(false);

  const handleLogout = () => {
    setLogoutRequired(true);
  };

  const doingLogout = (response) => {
    if (response) {
      setLogoutRequired(false);
      dispatch(authLogout());
    } else {
      setLogoutRequired(false);
    }
  };

  return (
    <header>
      <h1>{title || 'NODEPOP. Your second-hand sell/buy web'}</h1>
      <nav className='header-nav'>
        {isLogged && (
          <NavLink
            to='/adverts/new'
            className='navLink'
            end>
            New Advertisement
          </NavLink>
        )}
        {isLogged && (
          <NavLink
            to='/adverts'
            className='navLink'
            end>
            Advertisements list
          </NavLink>
        )}
        {isLogged && <Button onClick={handleLogout}>Log Out</Button>}
        {logoutRequired && (
          <ConfirmElement
            message='Really are you going to quit?'
            response={doingLogout}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
