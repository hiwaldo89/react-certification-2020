import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { appReducer } from '../../store/appReducer';
import { APP_STATE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import { INIT_STATE } from '../../store/actions';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`Can't use "useApp" without an AppProvider!`);
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null);

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
    <AppContext.Provider value={{ state, dispatch }}>
      {state ? children : null}
    </AppContext.Provider>
  );
};

export default AppProvider;
