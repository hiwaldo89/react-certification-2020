import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import Card from './Card.component';
import { theme } from '../App';

afterEach(cleanup);

const renderedComponent = ({ cardImg, title, videoId }) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Card cardImg={cardImg} title={title} videoId={videoId} />
      </MemoryRouter>
    </ThemeProvider>
  );

const cardProps = {
  cardImg: 'https://i.ytimg.com/vi/tutZKLeGrCs/hqdefault.jpg',
  title: "Feelin' good - [upbeat chillhop mix]",
  videoId: 'tutZKLeGrCs',
};

describe('Card', () => {
  it('should render a video card', () => {
    const { getByRole } = renderedComponent({
      ...cardProps,
    });

    expect(getByRole('img').getAttribute('src')).toBe(cardProps.cardImg);
    expect(getByRole('link').getAttribute('href')).toBe(`/video/${cardProps.videoId}`);
    expect(getByRole('heading')).toHaveTextContent(cardProps.title);
  });
});
