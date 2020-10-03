import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import VideoGrid from './VideoGrid.component';
import { theme } from '../App';

beforeEach(cleanup);

const videos = [
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
  {
    id: '2',
    snippet: {
      title: 'Video Title 2',
      thumbnails: {
        high: {
          url: 'imageUrl',
        },
      },
    },
  },
];

describe('VideoGrid', () => {
  it('Should render the Video Grid Component', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <VideoGrid videos={videos} />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(getByText('Video Title 1')).toBeInTheDocument();
    expect(getByText('Video Title 2')).toBeInTheDocument();
  });
});
