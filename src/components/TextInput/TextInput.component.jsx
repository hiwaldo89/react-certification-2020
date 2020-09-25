import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 0;
  padding: 0 15px;
  border: none;
  background-color: #fff;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const TextInput = React.memo(
  ({ placeholder, password = false, onChange, value, className }) => {
    return (
      <Input
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={password ? 'password' : 'text'}
      />
    );
  }
);

export default TextInput;
