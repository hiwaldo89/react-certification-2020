import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from './Header.component';
import { AuthContext } from '../../providers/Auth';

import { theme as defaultTheme } from '../App';

afterEach(cleanup);

const renderedComponent = (value = {}) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <ThemeProvider theme={defaultTheme}>
          <Header />
        </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('Should render the Home button', () => {
    const { getByTestId } = renderedComponent();
    expect(getByTestId('homeButton').getAttribute('href')).toBe('/');
    expect(getByTestId('homeButton')).toHaveTextContent('Home');
  });

  it('Should render a login button when user is not logged in', () => {
    const { getByTestId } = renderedComponent();
    expect(getByTestId('loginButton')).toBeInTheDocument();
  });

  it('Should hiden login button when user is logged in', () => {
    const { queryByTestId } = renderedComponent({ authenticated: true });
    expect(queryByTestId('loginButton')).toBeNull();
  });

  it('Should show a favorites button when the user is logged in', () => {
    const { getByTestId } = renderedComponent({ authenticated: true });
    expect(getByTestId('favoritesButton')).toBeInTheDocument();
  });

  it('Should show a logout button when the user is logged in', () => {
    const { getByTestId } = renderedComponent({ authenticated: true });
    expect(getByTestId('logoutButton')).toBeInTheDocument();
  });
});
