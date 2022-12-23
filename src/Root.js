import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export default function Root({ store, router }) {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
