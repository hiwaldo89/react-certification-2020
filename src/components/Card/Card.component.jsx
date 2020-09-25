import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { parseString } from '../../utils/parseString';

const CardWrapper = styled(Link)`
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.darkgreen}`};
  height: 100%;
  display: block;
  text-decoration: none;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightgreen};
    bottom: -10px;
    right: -10px;
    z-index: -1;
  }
`;

const CardVideo = styled.div`
  width: 100%;
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 15px 30px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.darkgreen};
  }
`;

const Card = ({ cardImg, title, videoId }) => {
  return (
    <CardWrapper to={`/video/${videoId}`}>
      <CardVideo>
        <img src={cardImg} alt={title} />
      </CardVideo>
      <CardContent>
        <h2>{parseString(title)}</h2>
      </CardContent>
    </CardWrapper>
  );
};

export default Card;
