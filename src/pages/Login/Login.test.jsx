import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import LoginPage from './Login.page';
import AuthProvider from '../../providers/Auth';
import { theme } from '../../components/App';

afterEach(cleanup);

const renderedComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </ThemeProvider>
  );

describe('LoginPage', () => {
  it('Should update username field on change', () => {
    const { getByPlaceholderText } = renderedComponent();
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'wizeline' } });
    expect(getByPlaceholderText('Username').getAttribute('value')).toBe('wizeline');
  });

  it('Should update password field on change', () => {
    const { getByPlaceholderText } = renderedComponent();
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '1234' } });
    expect(getByPlaceholderText('Password').getAttribute('value')).toBe('1234');
  });
});
