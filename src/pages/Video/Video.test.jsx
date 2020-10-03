import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import VideoPage from './Video.page';
import { AppContext } from '../../providers/App';
import { AuthContext } from '../../providers/Auth';
import { theme } from '../../components/App';
import { getRelatedVideos } from '../../api/videos.api';

afterEach(cleanup);

jest.mock('../../api/videos.api');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
  useRouteMatch: () => ({ url: '/video/123' }),
}));

const videoMock = {
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
};

const relatedVideoMock = {
  id: '456',
  snippet: {
    title: 'Video Title 2',
    description: 'Mock description 2',
    thumbnails: {
      medium: {
        url: 'imageUrl',
      },
    },
  },
};

const renderedComponent = (appContext, authContext) =>
  render(
    <AppContext.Provider value={appContext}>
      <AuthContext.Provider value={authContext}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <VideoPage />
          </MemoryRouter>
        </ThemeProvider>
      </AuthContext.Provider>
    </AppContext.Provider>
  );

describe('VideoPage', () => {
  it('Should show a favorites button when the user is logged in', async () => {
    getRelatedVideos.mockResolvedValueOnce({ data: { items: [relatedVideoMock] } });
    const { getByTestId } = renderedComponent(
      { videos: [videoMock], favoriteVideos: [] },
      { authenticated: true }
    );
    await waitFor(() =>
      expect(
        getByTestId('addToFavorites') || getByTestId('removeFromFavorites')
      ).toBeTruthy()
    );
  });

  it('Should show the video information', async () => {
    getRelatedVideos.mockResolvedValueOnce({ data: { items: [relatedVideoMock] } });
    const appContext = {
      videos: [videoMock],
      favoriteVideos: [],
    };
    const { getByTestId } = renderedComponent(appContext, {
      authenticated: true,
    });
    await waitFor(() =>
      expect(getByTestId('iframe').getAttribute('src')).toBe(
        `https://www.youtube.com/embed/${appContext.videos[0].id}`
      )
    );

    await waitFor(() =>
      expect(getByTestId('iframe').getAttribute('title')).toBe(
        appContext.videos[0].snippet.title
      )
    );

    await waitFor(() =>
      expect(getByTestId('videoHeading')).toHaveTextContent(
        appContext.videos[0].snippet.title
      )
    );

    await waitFor(() =>
      expect(getByTestId('videoDescription')).toHaveTextContent(
        appContext.videos[0].snippet.description
      )
    );
  });

  it('Should show a remove from favorites button when the video is on the favorites list', async () => {
    getRelatedVideos.mockResolvedValueOnce({ data: { items: [relatedVideoMock] } });
    const appContext = {
      videos: [videoMock],
      favoriteVideos: [videoMock],
    };
    const { getByTestId } = renderedComponent(appContext, {
      authenticated: true,
    });
    await waitFor(() => expect(getByTestId('removeFromFavorites')).toBeInTheDocument());
  });

  it('Should show an add to favorites button when the video is not on the favorites list', async () => {
    getRelatedVideos.mockResolvedValueOnce({ data: { items: [relatedVideoMock] } });
    const appContext = {
      videos: [videoMock],
      favoriteVideos: [],
    };
    const { getByTestId } = renderedComponent(appContext, { authenticated: true });
    await waitFor(() => expect(getByTestId('addToFavorites')).toBeInTheDocument());
  });
});
