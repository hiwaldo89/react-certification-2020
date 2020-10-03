import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import FavoritesPage from './Favorites.page';
import { AppContext } from '../../providers/App';
import { theme } from '../../components/App';

afterEach(cleanup);

const renderedComponent = (value = {}) =>
  render(
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );

describe('FavoritesPage', () => {
  it('Should render message when there are no videos', () => {
    const { getByText } = renderedComponent({ favoriteVideos: [] });
    expect(getByText('Add some videos to your favorite list')).toBeInTheDocument();
  });

  it('Should render videos if favorite videos is not empty', () => {
    const { getByText } = renderedComponent({
      favoriteVideos: [
        {
          id: '1',
          snippet: {
            title: 'Video Title 1',
            thumbnails: {
              high: {
                url: 'imageUrl',
              },
            },
          },
        },
      ],
    });
    expect(getByText('Video Title 1')).toBeInTheDocument();
  });
});
