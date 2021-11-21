// dependencies
import React, {useState, useEffect, useCallback} from 'react';
import Home from './pages/Home';
import Header from './components/Header'
import { Routes, Route , BrowserRouter as Router} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './AppContext';

// alerts
import { ToastContainer } from 'react-toastify';

// ethers
const ethers = require('ethers');

// for wallet
import Web3Modal from 'web3modal';
import  { useAddressHook } from './hooks/addressHooks/useAddressHook';
import { options } from  './providers'; 

// alerts
import { useAlert, alert} from './hooks/alertsHooks/useAlertHook';

// css
import './styles/App.css';

const targetNetwork = process.env.RAZZLE_TARGET_NETWORK === 'test' ? 4 : 1;

const App = () => {
    const web3Modal = new Web3Modal(options);

    const [injectedProvider, setInjectedProvider] = useState();
    const [chainId, setChainId] = useState();
    const [userAddress, setUserAddress] = useAddressHook(injectedProvider);
    
    // alert triggers
    const triggerNotCorrectNeworkIdAlert = alert(
      `Wrong network, connect to ${process.env.RAZZLE_TARGET_NETWORK === 'test' ? 'Rinkeby Network' :  'Ethereum Mainnet'}`,
      'bottom-right',
      'warning',
      0
    );

    useEffect(() => {
      if (web3Modal.cachedProvider) {
        loadWeb3Modal();
      }
    }, [loadWeb3Modal]);

    // sets the provider for web3modal
    const loadWeb3Modal = useCallback(async () => {
        let provider;
        try {
          provider = await web3Modal.connect()
        } catch (e){
          console.log(e);
        }

        if (provider) {
          
          setInjectedProvider(new ethers.providers.Web3Provider(provider));
          setChainId(Number(window.ethereum.chainId));

          provider.on("connect", () =>{
            if (Number(chainId) != targetNetwork){
              triggerNotCorrectNeworkIdAlert()  
            }
          });

          provider.on("chainChanged", chainId => {
            console.log(`chain changed to ${chainId}! updating providers`);
            setInjectedProvider(new ethers.providers.Web3Provider(provider));
            if (Number(chainId) != targetNetwork){
              triggerNotCorrectNeworkIdAlert()  
            }
          });
      
          provider.on("accountsChanged", () => {
            console.log(`account changed!`);
            setInjectedProvider(new ethers.providers.Web3Provider(provider));
            setChainId(window.ethereum.chainId);
            if (Number(chainId) != targetNetwork){
              triggerNotCorrectNeworkIdAlert()  
            }
          });
      
          // Subscribe to session disconnection
          provider.on("disconnect", (code, reason) => {
            console.log(code, reason)
            logoutOfWeb3Modal()
          });
        }

    }, [setInjectedProvider]);

    // logs out of web3Modal 
    const logoutOfWeb3Modal = async () => {

        await web3Modal.clearCachedProvider();

        if (injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
          await injectedProvider.provider.disconnect();
        }
        if (injectedProvider.close){
          await injectedProvider.close();
        } 
        if (injectedProvider.disconnect){
          await injectedProvider.disconnect();
        }

        setTimeout(() => {
          window.location.reload();
        }, 1);
    }

  return (
    <AppContextProvider>
      <Router >  
          <Header
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            providerOrSigner={injectedProvider}
            userAddress={userAddress}
          />
          <ToastContainer />

          <Routes>
            <Route 
            exact path="/" 
            element={<Home
              userAddress={userAddress}
              targetNetwork={targetNetwork}
              chainId={chainId}
            />}/>
          </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
