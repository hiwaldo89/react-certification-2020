import React from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom';

import { useAuth } from '../../providers/Auth';
import Navigation from './Navigation.styled';
import Button from './Button.styled';

const Header = () => {
  const { authenticated, logout } = useAuth();
  return (
    <Headroom style={{ background: '#fff' }}>
      <Navigation>
        <Link to="/">
          <Button type="button">Home</Button>
        </Link>
        {authenticated ? (
          <>
            <Link to="/favorites" className="ml-auto">
              <Button type="button" mr="14px" green>
                Favorites
              </Button>
            </Link>
            <Button type="button" dark onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login" className="ml-auto">
            <Button type="button" dark>
              Login
            </Button>
          </Link>
        )}
      </Navigation>
    </Headroom>
  );
};

export default Header;
