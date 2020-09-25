import {
  INIT_STATE,
  SET_SEARCH_QUERY,
  SET_VIDEOS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actions';
import { APP_STATE_KEY } from '../utils/constants';
import { storage } from '../utils/storage';

const setSearchQuery = (state, action) => {
  return {
    videos: [...state.videos],
    favoriteVideos: [...state.favoriteVideos],
    searchQuery: action.payload,
  };
};

const setVideos = (state, action) => {
  return {
    ...state,
    favoriteVideos: [...state.favoriteVideos],
    videos: action.payload,
  };
};

const addToFavorites = (state, action) => {
  return {
    ...state,
    videos: [...state.videos],
    favoriteVideos: [...state.favoriteVideos, action.payload],
  };
};

const removeFromFavorites = (state, action) => {
  return {
    ...state,
    videos: [...state.videos],
    favoriteVideos: state.favoriteVideos.filter(
      (currentVideo) => currentVideo.id.videoId !== action.payload
    ),
  };
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case INIT_STATE:
      return { ...action.payload };
    case SET_SEARCH_QUERY:
      storage.set(APP_STATE_KEY, setSearchQuery(state, action));
      return setSearchQuery(state, action);
    case SET_VIDEOS:
      storage.set(APP_STATE_KEY, setVideos(state, action));
      return setVideos(state, action);
    case ADD_TO_FAVORITES:
      storage.set(APP_STATE_KEY, addToFavorites(state, action));
      return addToFavorites(state, action);
    case REMOVE_FROM_FAVORITES:
      storage.set(APP_STATE_KEY, removeFromFavorites(state, action));
      return removeFromFavorites(state, action);
    default:
      return state;
  }
};
