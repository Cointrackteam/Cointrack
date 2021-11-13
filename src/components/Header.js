import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import NavBar from './NavBar';
import MetamaskConnectButton from './MetamaskConnectButton';
import BalancesCard from './BalancesCard';

const Header = () => {
  return (
    <NavBar>
      <MetamaskConnectButton />
    </NavBar>
  );
};

export default Header;
