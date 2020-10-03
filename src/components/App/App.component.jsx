import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AuthProvider from '../../providers/Auth';
import AppProvider from '../../providers/App';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import VideoPage from '../../pages/Video';
import FavoritesPage from '../../pages/Favorites';
import Layout from '../Layout';
import Private from '../Private';

export const theme = {
  colors: {
    green: '#6ab993',
    lightgreen: '#c5e2d4',
    darkgreen: '#082b2b',
  },
  fonts: {
    heading: 'Tinos',
    body: 'Lato',
  },
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <Layout>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Private exact path="/favorites">
                  <FavoritesPage />
                </Private>
                <Route path="/video/:id">
                  <VideoPage />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Layout>
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
