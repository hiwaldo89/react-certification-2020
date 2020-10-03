import React from 'react';
import { render, cleanup } from '@testing-library/react';

import NotFoundPage from './NotFound.page';

afterEach(cleanup);

describe('NotFound', () => {
  it('Should render the Not Found Page', () => {
    const { getByTestId } = render(<NotFoundPage />);
    expect(getByTestId('notFound')).toBeInTheDocument();
  });
});
