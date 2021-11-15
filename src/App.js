// dependencies
import React, { useCallback, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route } from 'react-router-dom'; // the main header of the website has to be integrated via react router

import Home from './pages/Home';
import { AppContextProvider } from './AppContext';
import Wallet from './components/wallet/Wallet';
import logo from './static/images/logo.svg';  
import db from './orbit-db/orbit';
// // const orbitDB = require('orbit-db');


// css
import './styles/App.css';

// let db = createDb().then(db => db = db);
// const createDb = async () => {
//   // Create IPFS instance
//   const ipfs = await client.add(options)
//   // Create OrbitDB instance
//   const orbitdb = await OrbitDB.createInstance(ipfs);
//   // create database instance
//   const db = await orbitdb.keyvalue('cointrack-test-db');
//   return db; 
// }

const App = (props) => {
  
  console.log(db);

  // const [db, setDb] = useState('');
  // const createDatabase = useCallback(async ()=> {
  //   let options = { repo : './cointrack/databases/test' };
    
  //   // create ipfs instance
  //   const ipfs = await ipfsClient.add(options)
    
  //   // create orbitdb instance
  //   const db = await orbitDB.createInstance(ipfs);
  // }) 
  
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
