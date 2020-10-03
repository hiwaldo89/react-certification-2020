import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Container from './Container.component';

afterEach(cleanup);

describe('Container', () => {
  it('should render the Container Component', () => {
    const { getByText } = render(<Container>Children</Container>);
    expect(getByText('Children')).toBeInTheDocument();
  });
});
