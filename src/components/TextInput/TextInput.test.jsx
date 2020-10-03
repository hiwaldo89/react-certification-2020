import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import TextInput from './TextInput.component';

afterEach(cleanup);

const mockOnChange = jest.fn();

describe('TextInput', () => {
  it('Should render a text type input', () => {
    const { getByTestId } = render(
      <TextInput
        placeholder="Testing"
        className="testClass"
        value="testValue"
        onChange={mockOnChange}
      />
    );
    expect(getByTestId('inputComponent').getAttribute('placeholder')).toBe('Testing');
    expect(getByTestId('inputComponent').getAttribute('class')).toContain('testClass');
    expect(getByTestId('inputComponent').getAttribute('value')).toBe('testValue');
    expect(getByTestId('inputComponent').getAttribute('type')).toBe('text');
    fireEvent.change(getByTestId('inputComponent'), { target: { value: 'a' } });
    expect(mockOnChange.mock.calls.length).toBe(1);
  });

  it('Should render a password type input', () => {
    const { getByTestId } = render(
      <TextInput
        placeholder="Testing"
        className="testClass"
        value="testValue"
        password
        onChange={mockOnChange}
      />
    );
    expect(getByTestId('inputComponent').getAttribute('placeholder')).toBe('Testing');
    expect(getByTestId('inputComponent').getAttribute('class')).toContain('testClass');
    expect(getByTestId('inputComponent').getAttribute('value')).toBe('testValue');
    expect(getByTestId('inputComponent').getAttribute('type')).toBe('password');
    fireEvent.change(getByTestId('inputComponent'), { target: { value: 'a' } });
    expect(mockOnChange.mock.calls.length).toBe(2);
  });
});
