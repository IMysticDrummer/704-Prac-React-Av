import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { checkLogged } from './components/auth/service';
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
      <OptionsContexProvider>
        <App />
      </OptionsContexProvider>
    </Root>
  </React.StrictMode>
);
