import React from 'react';

import StyledButton from './StyledButton.styled';

const Button = React.memo(({ children }) => {
  return <StyledButton>{children}</StyledButton>;
});

export default Button;
