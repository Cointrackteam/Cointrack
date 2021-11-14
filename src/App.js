// dependencies
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route } from 'react-router-dom'; // the main header of the website has to be integrated via react router

import Home from './pages/Home';
import { AppContextProvider } from './AppContext';
import Wallet from './components/wallet/Wallet';
import logo from './static/images/logo.svg';  

// css
import './styles/App.css';


const App = (props) => {
  return (
    <AppContextProvider>
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
        <Route exact path="/" component={Home}/>
    </AppContextProvider>
  );
};

export default App;
