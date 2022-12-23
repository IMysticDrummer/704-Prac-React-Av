import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { checkLogged } from './components/auth/service';
import Root from './Root';
import configureStore from './store';
import { createBrowserRouter } from 'react-router-dom';

//Test if it's initially logged
const accessToken = checkLogged();

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

const store = configureStore(
  { auth: { state: !!accessToken, askingLogout: false } },
  { router }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root
      store={store}
      router={router}
    />
  </React.StrictMode>
);
