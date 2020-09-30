import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.darkgreen};
`;

export default StyledTitle;
