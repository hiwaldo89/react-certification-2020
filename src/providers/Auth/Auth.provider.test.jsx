import React, { useContext } from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';

import AuthProvider, { AuthContext } from './Auth.provider';
import loginApi from '../../api/login.api';

afterEach(cleanup);

jest.mock('../../api/login.api');

const TestComponent = () => {
  const { login, logout, authenticated, user } = useContext(AuthContext);
  return (
    <>
      <div data-testid="status">{JSON.stringify(authenticated)}</div>
      <div data-testid="user">{authenticated && user?.name}</div>
      <button
        data-testid="button"
        type="button"
        onClick={(e) => {
          e.persist();
          if (authenticated) {
            logout();
          } else {
            login();
          }
        }}
      >
        {authenticated ? 'Logout' : 'Login'}
      </button>
    </>
  );
};

const renderedComponent = () =>
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

describe('AuthProvider', () => {
  it('Should log user in and out', async () => {
    loginApi.mockResolvedValueOnce({
      id: '123',
      name: 'Wizeline',
      avatarUrl:
        'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
    });
    const { getByTestId } = renderedComponent();
    fireEvent.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('user')).toHaveTextContent('Wizeline'));
    fireEvent.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('status')).toHaveTextContent('false'));
  });
});
