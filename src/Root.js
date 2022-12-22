import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { OptionsContexProvider } from './components/AdvertsPage/optionsContex';

export default function Root({ store, router, children }) {
  return (
    <Provider store={store}>
      <OptionsContexProvider>
        <RouterProvider router={router} />
      </OptionsContexProvider>
    </Provider>
  );
}
