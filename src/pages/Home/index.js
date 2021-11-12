import React from 'react';
import { Container } from 'react-bootstrap';
import CompInteractionCard from './CompInteractionCard';
import ConnectWalletModal from '../../components/ConnectWalletModal';
import useWalletConnectionModal from '../../hooks/useWalletConnectionModal';

// imported from template
import '../../styles/bootstrap.css';
import '../../styles/magnific-popup.css';
import '../../styles/fontawesome-all.css';
import '../../styles/swiper.css';
import '../../styles/styles.css';


const Home = () => {
  const { isWalletConnectModalOpen } = useWalletConnectionModal();
  return (
    <Container className="mt-5">
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      {/* <CompInteractionCard /> */}
    </Container>
  );
};

export default Home;
