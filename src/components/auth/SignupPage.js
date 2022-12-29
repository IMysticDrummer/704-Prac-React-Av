import EnterElement from '../common/EnterElement';
import classNames from 'classnames';
import styles from './LoginPage.module.css';
import { login, signup } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorElement from '../common/ErrorElement';
import { Button } from '../common/Button';
import styled from 'styled-components';
import Spinner from '../common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  uiResetError,
} from '../../store/actions';
import { getUi } from '../../store/selectors';
import enhancedForm from '../enhanced/enhancedForm';

const SignupPage = ({
  className,
  properties,
  onChange: enterElementHandleChange,
  ...props
}) => {
  const { username, password, email, name } = properties;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: isFetching, error } = useSelector(getUi);

  const disableButton = () => {
    return !(
      username.length !== 0 &&
      password.length !== 0 &&
      email.length !== 0 &&
      name.length !== 0
    );
  };

  const afterApiLogin = () => {
    dispatch(authLoginSuccess());
    const to = location.state?.from?.pathname || '/';
    navigate(to, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(authLoginRequest());
      await signup({ username, password, name, email });
      await login({ email, password });
      afterApiLogin();
    } catch (error) {
      error.message = 'This user o password are incorrect';
      dispatch(authLoginFailure(error));
    }
  };

  const handleErrorMessageClick = (event) => {
    event.preventDefault();
    dispatch(uiResetError());
  };

  return (
    <section className={classNames(styles.LoginPage, className)}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {isFetching && <Spinner />}

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
        <Button
          variant='primary'
          type='submit'
          disabled={disableButton()}
        >
          Sign Up
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

const initialData = {
  username: '',
  password: '',
  email: '',
  name: '',
};

const EnhancedSignupPage = enhancedForm(initialData)(SignupPage);

const StyledSignupPage = styled(EnhancedSignupPage)`
  background-color: ${'var(--main-bg-color)' || 'lightblue'};
  color: ${'var(--main-color)' || 'darkblue'};
`;

export default StyledSignupPage;
