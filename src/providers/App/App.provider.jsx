import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { appReducer } from '../../store/appReducer';
import { APP_STATE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import {
  INIT_STATE,
  SET_VIDEOS,
  SET_SEARCH_QUERY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../../store/actions';
import { searchVideos } from '../../api/videos.api';

export const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`Can't use "useApp" without an AppProvider!`);
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null);

  const fetchVideos = async (searchQuery) => {
    try {
      const result = await searchVideos(searchQuery);
      dispatch({ type: SET_VIDEOS, payload: result.data.items });
    } catch (e) {
      console.log(e);
    }
  };

  const setSearchQuery = (value) => dispatch({ type: SET_SEARCH_QUERY, payload: value });

  const addToFavorites = (video) => dispatch({ type: ADD_TO_FAVORITES, payload: video });

  const removeFromFavorites = (videoId) =>
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: videoId });

  useEffect(() => {
    const lastAppState = storage.get(APP_STATE_KEY) || null;
    dispatch({
      type: INIT_STATE,
      payload: {
        searchQuery: lastAppState?.searchQuery || 'majestic casual',
        videos: lastAppState?.videos || [],
        favoriteVideos: lastAppState?.favoriteVideos || [],
      },
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchVideos,
        setSearchQuery,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {state ? children : null}
    </AppContext.Provider>
  );
};

export default AppProvider;
