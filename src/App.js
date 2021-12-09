// dependencies
import React, {useState, useEffect, useCallback} from 'react';
import Home from './pages/Home';
import Header from './components/Header'
import { Routes, Route , BrowserRouter as Router} from 'react-router-dom';
import AnalysisResults from './components/AnalysisResults';
import { useAppContext } from './AppContext';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

import { newModal } from  './helpers/createModal'; 
import { ToastContainer, toast} from 'react-toastify';
import { generateOptions } from './helpers/toasts';

// ethers
const ethers = require('ethers');

const App = () => {
  const web3Modal = newModal();
  const targetNetwork = process.env.RAZZLE_TARGET_NETWORK === 'test' ? 4 : 1;
  const { setCEXAddressData, cexAddressData, setInjectedProvider, injectedProvider } = useAppContext();

  // alert triggers
  const triggerNotCorrectNeworkIdAlert = () => toast (
    <div>Wrong network, connect to {process.env.RAZZLE_TARGET_NETWORK === 'test' ? 'Rinkeby Network' :  'Ethereum Mainnet'}</div>,
    generateOptions(
      'bottom-right',
      'warning',
      0
    )
  );

  useEffect(()=>{
      if (web3Modal.cachedProvider) {
          login();
      }
      if(injectedProvider && Number(injectedProvider.chainId) !== targetNetwork) handleWrongChain(injectedProvider);
      
  }, [injectedProvider, login])

  useEffect(() => {
    // initialize cexData database
    if(!cexAddressData){
      setCEXAddressData();
    }
  }, []);

  // sets the provider for web3modal
  const login = useCallback(async () => {
    var injected;
    try {
        
        let provider = await web3Modal.connect();
        injected = new ethers.providers.Web3Provider(provider).provider;

        if(injected && Number(injected.chainId) !== 4) await handleWrongChain(injected, logout); // if wrong chain then switch chains

        injected.on('connect', info => {
            console.log(info);
        });

        injected.on('accountsChanged', account => {
            
            setInjectedProvider(new ethers.providers.Web3Provider(provider).provider);
        });

        injected.on('chainChanged', async chainId => {
            console.log(`switched chains ${chainId}`);
            if(window.ethereum.chainId !== targetNetwork) await handleWrongChain(window.ethereum);
            setInjectedProvider(new ethers.providers.Web3Provider(provider).provider);
        });

        injected.on("disconnect", (code, reason) => {
          console.log(code, reason)
          logout();
        });

        setInjectedProvider(injected);        

    } catch (e){ 
        console.log(e);
    }

  }, [injectedProvider]);

  const logout = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && typeof injectedProvider.disconnect == "function") {
      await injectedProvider.disconnect();
    }
    setInjectedProvider(undefined);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  }

  async function handleWrongChain (provider){
    
    triggerNotCorrectNeworkIdAlert();
    try {
      await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }],
      })
      console.log("switched chains sucessfully");
      window.location.reload();

    } catch (e){
      console.log(e);
    }
  } 

  return (
      <Router >  
          <Header
            loadWeb3Modal={login}
            logoutOfWeb3Modal={logout}
          />

          <Routes>
            <Route path="/" element={<Home />}> {/** home page **/}
              <Route path=":resultsId" element={<AnalysisResults />} /> {/** results component **/}
            </Route>
            {/* <Route path="/*" element={<h1 style={{marginTop: '10rem'}}>Oops! page does not exist</h1>} /> */}
          </Routes>
          <ToastContainer style={{width: "unset", padding: "0.5rem 0.5rem"}}/>
      </Router>
  );
};

export default App;




