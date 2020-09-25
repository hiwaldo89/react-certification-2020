import React from 'react';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useAuth } from '../../providers/Auth';

const Navigation = styled.nav`
  width: 100%;
  padding: 20px 15px;
  margin: auto;
  display: flex;
  @media (min-width: 768px) {
    width: 97%;
    padding-left: 0;
    padding-right: 0;
  }
  .ml-auto {
    margin-left: auto;
  }
`;

const Button = styled.button`
  position: relative;
  padding: 17.5px 20px;
  font-size: 13px;
  line-height: 13px;
  max-height: 50px;
  letter-spacing: 1px;
  background: ${(props) => {
    if (props.green) {
      return props.theme.colors.green;
    }
    if (props.dark) {
      return props.theme.colors.darkgreen;
    }
    return '#fff';
  }};
  border: ${(props) =>
    `1px solid ${props.green || props.dark ? '#fff' : props.theme.colors.darkgreen}`};
  color: ${(props) =>
    props.green || props.dark ? '#fff' : props.theme.colors.darkgreen};
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${({ theme }) => `3px 3px 0 1px ${theme.colors.lightgreen}`};
  top: 0;
  left: 0;
  text-decoration: none;
  display: inline-block;
  transition: 0.15s ease-in-out;
  ${(props) => props?.ml && `margin-left: ${props.ml};`}
  ${(props) => props?.mr && `margin-right: ${props.mr};`}
  &:hover {
    box-shadow: ${({ theme }) => `0 0 0 0 ${theme.colors.lightgreen}`};
    top: 3px;
    left: 3px;
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

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
