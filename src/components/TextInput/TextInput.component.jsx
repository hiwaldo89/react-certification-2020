import React from 'react';

import Input from './Input.styled';

const TextInput = React.memo(
  ({ placeholder, password = false, onChange, value, className }) => {
    return (
      <Input
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={password ? 'password' : 'text'}
        data-testid="inputComponent"
      />
    );
  }
);

export default TextInput;
