import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 600px;
  max-width: 80%;
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    text-align: center;
    color: ${({ theme }) => theme.colors.darkgreen};
  }
`;

export default FormWrapper;
