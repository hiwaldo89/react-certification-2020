import React, { useEffect } from 'react';
import styled from 'styled-components';

import TextInput from '../../components/TextInput';
import { useApp } from '../../providers/App';
import { SET_SEARCH_QUERY, SET_VIDEOS } from '../../store/actions';
import { searchVideos } from '../../api/videos.api';
import VideoGrid from '../../components/VideoGrid';
import Container from '../../components/Container';
import { useAuth } from '../../providers/Auth';

const SearchInput = styled(TextInput)`
  width: 300px;
  max-width: 100%;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.darkgreen};
`;

const HomePage = () => {
  const { state, dispatch } = useApp();
  const { authenticated, user } = useAuth();
  const fetchVideos = async () => {
    try {
      const result = await searchVideos(state.searchQuery);
      dispatch({ type: SET_VIDEOS, payload: result.data.items });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (state.videos.length === 0) {
      fetchVideos(state.searchQuery);
    }
  });

  return (
    <Container>
      {authenticated && <Title>Welcome, {`${user.name || 'User'}!`}</Title>}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          fetchVideos(state.searchQuery);
        }}
      >
        <SearchInput
          placeholder="Buscar..."
          value={state.searchQuery}
          onChange={(event) => {
            event.persist();
            dispatch({ type: SET_SEARCH_QUERY, payload: event.target.value });
          }}
        />
      </form>
      {!!state.videos.length && <VideoGrid videos={state.videos} />}
    </Container>
  );
};

export default HomePage;
