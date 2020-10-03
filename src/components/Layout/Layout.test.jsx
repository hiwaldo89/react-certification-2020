import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Layout from './Layout.component';
import AuthProvider from '../../providers/Auth';
import { theme as defaultTheme } from '../App';

afterEach(cleanup);

describe('Layout', () => {
  it('Should render the Layout Component', () => {
    const { getByText } = render(
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <Layout>Children</Layout>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    );
    expect(getByText('Children')).toBeInTheDocument();
  });
});
