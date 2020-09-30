import {
  INIT_STATE,
  SET_SEARCH_QUERY,
  SET_VIDEOS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actions';
import { APP_STATE_KEY } from '../utils/constants';
import { storage } from '../utils/storage';
import { getVideoId } from '../utils/getVideoId';

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
  const alreadyInFavorites = state.favoriteVideos.find((currentVideo) => {
    const currentVideoId = getVideoId(currentVideo);
    return currentVideoId === action.payload.id.videoId;
  });
  if (alreadyInFavorites) {
    return state;
  }
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
    favoriteVideos: state.favoriteVideos.filter((currentVideo) => {
      const currentVideoId = getVideoId(currentVideo);
      return currentVideoId !== action.payload;
    }),
  };
};

export const appReducer = (state, action) => {
  let result;
  switch (action.type) {
    case INIT_STATE:
      return { ...action.payload };
    case SET_SEARCH_QUERY:
      result = setSearchQuery(state, action);
      storage.set(APP_STATE_KEY, result);
      return result;
    case SET_VIDEOS:
      result = setVideos(state, action);
      storage.set(APP_STATE_KEY, result);
      return result;
    case ADD_TO_FAVORITES:
      result = addToFavorites(state, action);
      storage.set(APP_STATE_KEY, result);
      return result;
    case REMOVE_FROM_FAVORITES:
      result = removeFromFavorites(state, action);
      storage.set(APP_STATE_KEY, result);
      return result;
    default:
      return state;
  }
};
