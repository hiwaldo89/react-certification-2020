import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import Button from './Button.component';
import { theme } from '../App';

afterEach(cleanup);

const renderedComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <Button>Login</Button>
    </ThemeProvider>
  );

describe('Button', () => {
  it('renders a button with text', () => {
    const { getByText } = renderedComponent();
    expect(getByText('Login')).toBeInTheDocument();
  });
});
