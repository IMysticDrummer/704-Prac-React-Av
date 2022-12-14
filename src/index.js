import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginContextProvider } from './components/auth/context';
import { checkLogged, handleLogout } from './components/auth/service';
import { OptionsContexProvider } from './components/AdvertsPage/optionsContex';

//Test if it's initially logged
const accessToken = checkLogged();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <LoginContextProvider
        isInitiallyLogged={!!accessToken}
        onLogout={handleLogout}>
        <OptionsContexProvider>
          <App />
        </OptionsContexProvider>
      </LoginContextProvider>
    </Router>
  </React.StrictMode>
);
