import React from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../../components/Hero';


const Home = () => {
  return (
    <div id='header' className="header">
      <Container>
        <Hero />
      </Container> 
    </div>
  );
};

export default Home;
