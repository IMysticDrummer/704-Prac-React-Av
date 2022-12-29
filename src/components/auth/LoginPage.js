import EnterElement from '../common/EnterElement';
import classNames from 'classnames';
import styles from './LoginPage.module.css';

import ErrorElement from '../common/ErrorElement';
import { Button } from '../common/Button';
import styled from 'styled-components';
import Spinner from '../common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';
import enhancedForm from '../enhanced/enhancedForm';

export const LoginPage = ({
  className,
  properties,
  onChange: enterElementHandleChange,
  ...props
}) => {
  const dispatch = useDispatch();
  const { isLoading: isFetching, error } = useSelector(getUi);

  const { password, email, remember } = properties;

  const disableButton = () => {
    return !(email.length !== 0 && password.length !== 0 && !isFetching);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(authLogin({ email, password, remember }));
  };

  const handleErrorMessageClick = (event) => {
    event.preventDefault();
    dispatch(uiResetError());
  };

  return (
    <section className={classNames(styles.LoginPage, className)}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {isFetching && <Spinner />}
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
        <EnterElement
          labelText='Remember me'
          type='checkbox'
          name='remember'
          onChange={enterElementHandleChange}
          checked={remember}
        />

        <Button
          variant='primary'
          type='submit'
          disabled={disableButton()}
        >
          Login
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
          altMessage='Unathorized'
          handleErrorMessageClick={handleErrorMessageClick}
        />
      )}
    </section>
  );
};

const initialData = {
  password: '',
  email: '',
  remember: false,
};

const EnhancedLoginPage = enhancedForm(LoginPage, initialData);

//const StyledLoginPage = styled(LoginPage)`
const StyledLoginPage = styled(EnhancedLoginPage)`
  background-color: ${'var(--main-bg-color)' || 'lightblue'};
  color: ${'var(--main-color)' || 'darkblue'};
`;

export default StyledLoginPage;
