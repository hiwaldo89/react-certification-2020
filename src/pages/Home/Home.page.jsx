import React, { useEffect } from 'react';

import { useApp } from '../../providers/App';
import VideoGrid from '../../components/VideoGrid';
import Container from '../../components/Container';
import { useAuth } from '../../providers/Auth';
import SearchInput from './SearchInput.styled';
import Title from '../../components/Title';

const HomePage = () => {
  const { videos, searchQuery, fetchVideos, setSearchQuery } = useApp();
  const { authenticated, user } = useAuth();

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos(searchQuery);
    }
  }, []);

  return (
    <Container>
      {authenticated && <Title>Welcome, {`${user.name || 'User'}!`}</Title>}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          fetchVideos(searchQuery);
        }}
      >
        <SearchInput
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(event) => {
            event.persist();
            setSearchQuery(event.target.value);
          }}
        />
      </form>
      {videos.length > 0 && <VideoGrid videos={videos} />}
    </Container>
  );
};

export default HomePage;
