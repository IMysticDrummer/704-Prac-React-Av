import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

/**
 * Contex provider to control de authorisation. Check and manage the login status
 * @param {{Boolean, Function, Children}} param0 isInitiallyLogged to indicate the starting state; onLogut to describe the handle function to run when logout; children props
 * @returns {Context.Provider} LoginContex.Provider with children
 */
export const LoginContextProvider = ({
  isInitiallyLogged,
  onLogout,
  children,
}) => {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const setLoginTrue = () => setIsLogged(true);
  const setLogout = () => {
    onLogout();
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider value={{ isLogged, setLoginTrue, setLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const LoginContextConsumer = LoginContext.Consumer;

LoginContext.displayName = 'Logged';

/**
 * Custom hook that returns the LoginContext
 */
export const useLogin = () => {
  const value = useContext(LoginContext);
  return value;
};

export default LoginContext;
