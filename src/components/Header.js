import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Wallet from './wallet/Wallet';
import logo from '../static/images/logo-main.svg';  


export default function Header({loadWeb3Modal, logoutOfWeb3Modal, providerOrSigner, userAddress}) {
    return (
        <Navbar expand='lg' fixed='top' >
            <Container>
              <Navbar.Brand className="logo-image" href="/">
                <img
                src={logo}
                style={{height: "3.75rem"}}
                alt="Cointrack"/>
              </Navbar.Brand>
              
              <Nav.Item as='span'>
                <Wallet
                  loadWeb3Modal={loadWeb3Modal}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                  providerOrSigner={providerOrSigner}
                  userAddress={userAddress}
                />
              </Nav.Item>
            </Container>
        </Navbar>
    )
}
