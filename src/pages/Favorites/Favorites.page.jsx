import React from 'react';

import Container from '../../components/Container';
import VideoGrid from '../../components/VideoGrid';
import { useApp } from '../../providers/App';
import Title from '../../components/Title';

const FavoritesPage = () => {
  const { favoriteVideos } = useApp();

  return (
    <Container>
      {favoriteVideos.length ? (
        <VideoGrid videos={favoriteVideos} />
      ) : (
        <Title>Add some videos to your favorite list</Title>
      )}
    </Container>
  );
};

export default FavoritesPage;
