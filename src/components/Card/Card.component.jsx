import React from 'react';

import { parseString } from '../../utils/parseString';
import CardWrapper from './CardWrapper.styled';
import CardVideo from './CardVideo.styled';
import CardContent from './CardContent.styled';

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
