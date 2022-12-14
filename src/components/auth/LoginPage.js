import { useState } from 'react';
import EnterElement from '../common/EnterElement';
import classNames from 'classnames';
import styles from './LoginPage.module.css';
import { login, signup } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from './context';
import ErrorElement from '../common/ErrorElement';
import { Button } from '../common/Button';
import styled from 'styled-components';
import Spinner from '../common/Spinner';

const LoginPage = ({ isSignUp, className, ...props }) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginTrue: onLogin } = useLogin();

  const enterElementHandleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'remember') {
      setRemember((remember) => !remember);
    }
  };

  const disableButton = () => {
    if (!isSignUp) {
      return !(email.length !== 0 && password.length !== 0 && !isFetching);
    }
    return !(
      username.length !== 0 &&
      password.length !== 0 &&
      email.length !== 0 &&
      name.length !== 0
    );
  };

  const afterApiLogin = () => {
    onLogin();
    const to = location.state?.from?.pathname || '/';
    navigate(to, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSignUp) {
      try {
        setError(null);
        setIsFetching(true);
        await login({ email, password }, remember);
        afterApiLogin();
      } catch (error) {
        setError(error);
      }
      setIsFetching(false);
    } else {
      try {
        setError(null);
        setIsFetching(true);
        await signup({ username, password, name, email });
        await login({ email, password });
        afterApiLogin();
      } catch (error) {
        error.message = 'This user o passwors are incorrect';
        setError(error);
      }
    }
  };

  const handleErrorMessageClick = (event) => {
    event.preventDefault();
    setError(null);
  };

  return (
    <section className={classNames(styles.LoginPage, className)}>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isFetching && <Spinner />}
        {isSignUp && (
          <div>
            <EnterElement
              labelText='Enter your name'
              type='text'
              name='name'
              onChange={enterElementHandleChange}
              value={name}
            />
            <EnterElement
              labelText='Enter your username'
              type='text'
              name='username'
              onChange={enterElementHandleChange}
              value={username}
            />
          </div>
        )}
        <EnterElement
          labelText='Enter your email'
          type='email'
          name='email'
          placeholder='someone@mail.com'
          onChange={enterElementHandleChange}
          value={email}
        />
        <EnterElement
          labelText='Enter your password'
          type='password'
          name='password'
          onChange={enterElementHandleChange}
          value={password}
        />
        {!isSignUp && (
          <EnterElement
            labelText='Remember me'
            type='checkbox'
            name='remember'
            onChange={enterElementHandleChange}
            checked={remember}
          />
        )}

        <Button
          variant='primary'
          type='submit'
          disabled={disableButton()}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      </form>
      {error?.status === 500 && (
        <ErrorElement
          error={error}
          altMessage='Test your cable'
          handleErrorMessageClick={handleErrorMessageClick}
        />
      )}
      {error?.status === 401 && (
        <ErrorElement
          error={error}
          altMessage='Test your cable'
          handleErrorMessageClick={handleErrorMessageClick}
        />
      )}
    </section>
  );
};

const StyledLoginPage = styled(LoginPage)`
  background-color: ${'var(--main-bg-color)' || 'lightblue'};
  color: ${'var(--main-color)' || 'darkblue'};
`;

export default StyledLoginPage;
