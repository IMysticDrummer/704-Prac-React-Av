import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { authLogin, uiResetError } from '../../../store/actions';
import { defaultState } from '../../../store/reducers';
import { EnhancedLoginPage } from '../LoginPage';

jest.mock('../../../store/actions');

describe('Test de la página LoginPage', () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  };
  const errorState401 = {
    ...defaultState,
    ui: { isLoading: false, error: { status: 401 } },
  };
  const errorState500 = {
    ...defaultState,
    ui: { isLoading: false, error: { status: 500 } },
  };
  const storeWithError401 = { ...store, getState: () => errorState401 };
  const storeWithError500 = { ...store, getState: () => errorState500 };

  const renderComponent = (store) =>
    render(
      <Provider store={store}>
        <EnhancedLoginPage />
      </Provider>
    );

  const validCredentials = {
    email: 'prueba@yo.com',
    password: '123456',
    remember: 'on',
  };

  test('Snapshot', () => {
    const { container } = renderComponent(store);
    expect.assertions(1);
    expect(container).toMatchSnapshot();
  });

  test('submit button must be disabled if email field or password field are empty', () => {
    renderComponent(store);
    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    expect.assertions(4);
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: validCredentials.email } });
    expect(submitButton).toBeDisabled();
    fireEvent.change(passwordInput, {
      target: { value: validCredentials.password },
    });
    fireEvent.change(emailInput, { target: { value: null } });
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: validCredentials.email } });
    expect(submitButton).toBeEnabled();
  });

  it('shoud dispatch authLogin action when username and password exists and click "Login"', () => {
    renderComponent(store);

    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const rememberInput = screen.getByLabelText(/Remember/);
    const submitButton = screen.getByRole('button');

    fireEvent.change(emailInput, { target: { value: validCredentials.email } });
    fireEvent.change(passwordInput, {
      target: { value: validCredentials.password },
    });
    fireEvent.click(rememberInput);

    fireEvent.click(submitButton);
    expect.assertions(1);
    expect(authLogin).toHaveBeenCalledWith(validCredentials);
  });

  describe('Error messages in LoginPage', () => {
    it("shouldn't appear error if there's no an error", async () => {
      renderComponent(store);
      expect.assertions(2);
      let message;
      try {
        const message = await screen.findByText(/401/);
      } catch {
        expect(message).not.toBeDefined();
      }
      try {
        message = await screen.findByText(/500/);
      } catch {
        expect(message).not.toBeDefined();
      }
    });
    it("should appear Unathorized-401 if there's an 401 error", async () => {
      renderComponent(storeWithError401);
      const message = await screen.findByText(/401/);
      expect.assertions(1);
      expect(message).toBeVisible();
    });
    it("should appear 500 error if there's an 500 error", async () => {
      renderComponent(storeWithError500);
      const message = await screen.getByText(/500/);
      expect.assertions(1);
      expect(message).toBeVisible();
    });
    it('should disappear when click over it', () => {
      renderComponent(storeWithError401);
      const message = screen.getByText(/continue/);
      expect.assertions(2);
      expect(message).toBeDefined();
      fireEvent.click(message);
      expect(uiResetError).toHaveBeenCalled();
    });
  });
});
