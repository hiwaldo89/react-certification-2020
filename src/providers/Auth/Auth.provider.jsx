import React, { useState, useEffect, useContext, useCallback } from 'react';

import { AUTH_STORAGE_KEY, USER_STORAGE_KEY, APP_STATE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import loginApi from '../../api/login.api';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const isAuthenticated = Boolean(lastAuthState);
    const lastUserState = storage.get(USER_STORAGE_KEY) || null;

    setAuthenticated(isAuthenticated);
    setUser(lastUserState);
  }, []);

  const login = useCallback(async (username, password) => {
    const result = await loginApi(username, password);
    if (result) {
      setAuthenticated(true);
      setUser(result);
      storage.set(AUTH_STORAGE_KEY, true);
      storage.set(USER_STORAGE_KEY, result);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setUser(null);
    storage.set(AUTH_STORAGE_KEY, false);
    storage.delete(USER_STORAGE_KEY);
    storage.delete(APP_STATE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;
