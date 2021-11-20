import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Wallet from './wallet/Wallet';
import logo from '../static/images/logo.svg';  


export default function Header() {
    return (
        <Navbar expand='lg' fixed='top' >
            <Container>
              <Navbar.Brand className="logo-image" href="/">
                <img
                src={logo}
                alt="Cointrack"/>
              </Navbar.Brand>
              
              <Nav.Item as='span'>
                <Wallet />
              </Nav.Item>
            </Container>
        </Navbar>
    )
}
