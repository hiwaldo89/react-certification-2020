import { appReducer } from './appReducer';
import {
  INIT_STATE,
  SET_SEARCH_QUERY,
  SET_VIDEOS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actions';

const mockState = {
  videos: [],
  favoriteVideos: [],
  searchQuery: '',
};

describe('appReducer', () => {
  it('Should initiate state', () => {
    const result = appReducer({}, { type: INIT_STATE, payload: mockState });
    expect(result).toEqual(mockState);
  });

  it('Should set search query', () => {
    const result = appReducer(mockState, { type: SET_SEARCH_QUERY, payload: 'testing' });
    expect(result.searchQuery).toBe('testing');
  });

  it('Should set videos array', () => {
    const result = appReducer(mockState, { type: SET_VIDEOS, payload: [1, 2, 3] });
    expect(result.videos).toEqual([1, 2, 3]);
  });

  it('Should add video to favorites', () => {
    const result = appReducer(mockState, { type: ADD_TO_FAVORITES, payload: 1 });
    expect(result.favoriteVideos).toEqual([1]);
  });

  it('Should remove video from favorites', () => {
    const result = appReducer(
      { ...mockState, favoriteVideos: [{ id: 123 }] },
      { type: REMOVE_FROM_FAVORITES, payload: 123 }
    );
    expect(result.favoriteVideos).toEqual([]);
  });
});
