import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import Title from './Title.component';
import { theme } from '../App';

afterEach(cleanup);

describe('Title', () => {
  it('Should render a Title Component', () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Title>Mock Title</Title>
      </ThemeProvider>
    );
    expect(getByRole('heading')).toHaveTextContent('Mock Title');
  });
});
