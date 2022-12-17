import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoginContextProvider } from './components/auth/context';
import { checkLogged, handleLogout } from './components/auth/service';
import { OptionsContexProvider } from './components/AdvertsPage/optionsContex';
import Root from './Root';
import configureStore from './store';

//Test if it's initially logged
const accessToken = checkLogged();
const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <LoginContextProvider
        isInitiallyLogged={!!accessToken}
        onLogout={handleLogout}
      >
        <OptionsContexProvider>
          <App />
        </OptionsContexProvider>
      </LoginContextProvider>
    </Root>
  </React.StrictMode>
);
