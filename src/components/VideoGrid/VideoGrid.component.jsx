import React from 'react';

import Card from '../Card';
import Grid from './Grid.styled';
import Column from './Column.styled';
import { getVideoId } from '../../utils/getVideoId';

const VideoGrid = ({ videos }) => {
  return (
    <Grid>
      {videos.map((video) => {
        const videoId = getVideoId(video);
        return (
          <Column key={videoId}>
            <Card
              videoId={videoId}
              cardImg={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
            />
          </Column>
        );
      })}
    </Grid>
  );
};

export default VideoGrid;
