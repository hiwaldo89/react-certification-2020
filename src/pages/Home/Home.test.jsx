import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import HomePage from './Home.page';
import AppProvider from '../../providers/App';
import { AuthContext } from '../../providers/Auth';
import { theme } from '../../components/App';

afterEach(cleanup);

const renderedComponent = () =>
  render(
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ authenticated: true, user: { name: 'Oswaldo' } }}>
          <HomePage />
        </AuthContext.Provider>
      </ThemeProvider>
    </AppProvider>
  );

describe('HomePage', () => {
  it('Should render a welcome message when the user is logged in', () => {
    const { getByRole } = renderedComponent();
    expect(getByRole('heading')).toHaveTextContent('Oswaldo');
  });
});
