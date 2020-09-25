import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  padding: 80px 15px;
  @media (min-width: 768px) {
    width: 90%;
    max-width: 1160px;
    margin: auto;
  }
`;

const Container = ({ children }) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
