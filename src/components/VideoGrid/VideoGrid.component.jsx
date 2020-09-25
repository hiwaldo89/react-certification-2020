import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

const Column = styled.div`
  width: 33.3333333%;
  flex: 0 0 33.3333333%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 2.5rem;
`;

const VideoGrid = ({ videos }) => {
  return (
    <Grid>
      {videos.map((video) => (
        <Column key={video.id.videoId}>
          <Card
            videoId={video.id.videoId}
            cardImg={video.snippet.thumbnails.high.url}
            title={video.snippet.title}
          />
        </Column>
      ))}
    </Grid>
  );
};

export default VideoGrid;
