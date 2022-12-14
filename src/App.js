import AdvertsPage from './components/AdvertsPage/AdvertsPage';
import LoginPage from './components/auth/LoginPage';
import NewAdvertPage from './components/AdvertsPage/NewAdvertPage.js';
import { Fragment } from 'react';
import Layout from './components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdvertPage from './components/AdvertsPage/AdvertPage';
import RequireAuth from './components/auth/RequireAuth';
import Page from './components/Layout/Page';
import StyledCuatrocientosCuatro from './components/common/CuatrocientosCuatro';

function App() {
  const title = 'NODEPOP. Your joke second-hand sell/buy web';

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/login'
          element={
            <Fragment>
              <Layout title={title} />
              <Page subTitle='Sign up / Login for a full experience!!'>
                <LoginPage />
                <LoginPage isSignUp='true' />
              </Page>
            </Fragment>
          }
        />

        <Route
          path='/'
          element={<Navigate to='/adverts' />}
        />

        <Route
          path='/adverts'
          element={<Layout title={title} />}
        >
          <Route
            index
            element={
              <RequireAuth>
                <AdvertsPage
                  subTitle='Wellcome to your commerce world!'
                  className='customizeAdvertsPage'
                />
              </RequireAuth>
            }
          />
          <Route
            path='new'
            element={
              <RequireAuth>
                <NewAdvertPage subTitle='What do you want to buy/sell?' />
              </RequireAuth>
            }
          />

          <Route
            path=':id'
            element={
              <RequireAuth>
                <AdvertPage subTitle='Wellcome to your commerce world!' />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path='/404'
          element={<StyledCuatrocientosCuatro />}
        />
        <Route
          path='*'
          element={<Navigate to='/404' />}
        />
      </Routes>
    </div>
  );
}

export default App;
