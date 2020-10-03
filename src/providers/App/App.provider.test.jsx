import React, { useContext } from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import AppProvider, { AppContext } from './App.provider';
import { searchVideos } from '../../api/videos.api';

afterEach(cleanup);

jest.mock('../../api/videos.api');

const mockVideos = {
  data: {
    items: [
      {
        id: '123',
        snippet: {
          title: 'Video Title 1',
          description: 'Mock description',
          thumbnails: {
            high: {
              url: 'imageUrl',
            },
          },
        },
      },
    ],
  },
};

const TestComponent = () => {
  const { videos, searchQuery, favoriteVideos, fetchVideos } = useContext(AppContext);
  return (
    <>
      <div data-testid="videos">{JSON.stringify(videos)}</div>
      <div data-testid="favoriteVideos">{JSON.stringify(favoriteVideos)}</div>
      <div data-testid="searchQuery">{searchQuery}</div>
      <button
        data-testid="fetchVideos"
        onClick={(e) => {
          e.persist();
          fetchVideos(searchQuery);
        }}
        type="button"
      >
        fetchVideos
      </button>
    </>
  );
};

const renderedComponent = () =>
  render(
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );

describe('AppProvider', () => {
  it('Should fetch videos', async () => {
    searchVideos.mockResolvedValueOnce(mockVideos);
    const { getByTestId } = renderedComponent();
    const videoArray = JSON.parse(getByTestId('videos').innerHTML);
    await waitFor(() => expect(videoArray).toEqual([]));
    fireEvent.click(getByTestId('fetchVideos'));
    await waitFor(() => expect(videoArray.length > 0).toBeTruthy);
  });

  it('Should change the searchQuery', async () => {
    searchVideos.mockResolvedValueOnce(mockVideos);
    const { getByTestId } = renderedComponent();
    await waitFor(() =>
      expect(getByTestId('searchQuery')).toHaveTextContent('majestic casual')
    );
  });
});
