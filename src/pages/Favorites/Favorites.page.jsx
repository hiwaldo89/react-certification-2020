import React from 'react';
import styled from 'styled-components';

import Container from '../../components/Container';
import VideoGrid from '../../components/VideoGrid';
import { useApp } from '../../providers/App';

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.darkgreen};
`;

const FavoritesPage = () => {
  const { state } = useApp();

  return (
    <Container>
      {state.favoriteVideos.length ? (
        <VideoGrid videos={state.favoriteVideos} />
      ) : (
        <Title>Add some videos to your favorite list</Title>
      )}
    </Container>
  );
};

export default FavoritesPage;
