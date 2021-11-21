import React from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../../components/Hero';


const Home = ({userAddress, targetNetwork, chainId}) => {
  return (
    <div id='header' className="header">
      <Container>
        <Hero
          userAddress={userAddress} 
          targetNetwork={targetNetwork} 
          chainId={chainId}
        />
      </Container> 
    </div>
  );
};

export default Home;
