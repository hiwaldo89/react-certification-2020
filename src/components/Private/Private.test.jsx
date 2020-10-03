import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Private from './Private.component';
import { AuthContext } from '../../providers/Auth';

afterEach(cleanup);

const renderedComponent = (value) =>
  render(
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <Private>
          <div>Children</div>
        </Private>
      </AuthContext.Provider>
    </BrowserRouter>
  );

describe('Private', () => {
  it('Should redirect if user is not authenticated', () => {
    const { queryByText } = renderedComponent({ authenticated: false });
    expect(queryByText('Children')).toBeNull();
  });

  it('Should show child component when user is authenticated', () => {
    const { queryByText } = renderedComponent({ authenticated: true });
    expect(queryByText('Children')).toBeInTheDocument();
  });
});
