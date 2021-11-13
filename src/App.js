import React, {useCallback, useEffect, useState} from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import {Alert, Button, Card, Col, Input, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap';
import ReactJson from 'react-json-view';
import { ethers } from 'ethers';
import {Account, Address, AddressInput, GasGauge, ThemeSwitch, Ramp } from './components/wallet';
import {NETWORK, NETWORKS, INFURA_ID, ETHERSCAN_KEY, BLOCKNATIVE_DAPPID} from "./constants";
import { Transactor } from './helpers';
import Web3Modal from "web3modal";
import { Route } from 'react-router-dom'; // the main header of the website has to be integrated via react router

import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Authereum from "authereum";

import './styles/App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { AppContextProvider } from './AppContext';

// web-react 
import { 
  useBalance,
  useGasPrice, 
  // useOnBlock,
  useUserProviderAndSigner
} from "eth-hooks";
import { 
  useEventListener
} from "eth-hooks/events/useEventListener";

// import {
//   useExchangeEthPrice,
// } from "eth-hooks/dapps/dex";

// network you want the user to connected to
const targetNetwork = process.targetNetwork === "test" ? NETWORKS.rinkeby : NETWORKS.mainnet;

const poktMainnetProvider = navigator.onLine ? new ethers.providers.StaticJsonRpcProvider(targetNetwork === NETWORKS.mainnet ? process.env.POKT_MAINNET : process.env.POKT_RINKEBY ) : null;
const mainnetInfura = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
  : null;

const blockExplorer = targetNetwork.blockExplorer; 
const walletLink = new WalletLink({
  appName: 'coinbase'
})
// provider for walletLink
const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const web3Modal = new Web3Modal({
  network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: "light", // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: "https://polygon.bridge.walletconnect.org",
        infuraId: INFURA_ID,
        rpc: {
          1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          42: `https://kovan.infura.io/v3/${INFURA_ID}`,
          100: "https://dai.poa.network", // xDai
        },
      },

    },
    portis: {
      display: {
        logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
        name: "Portis",
        description: "Connect to Portis App",
      },
      package: Portis,
      options: {
        id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_5A7C91B2FC585A17", // required
      },
    },
    // torus: {
    //   package: Torus,
    //   options: {
    //     networkParams: {
    //       host: "https://localhost:8545", // optional
    //       chainId: 1337, // optional
    //       networkId: 1337 // optional
    //     },
    //     config: {
    //       buildEnv: "development" // optional
    //     },
    //   },
    // },
    "custom-walletlink": {
      display: {
        logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
        name: "Coinbase",
        description: "Connect to Coinbase Wallet (not Coinbase App)",
      },
      package: walletLinkProvider,
      connector: async (provider, _options) => {
        await provider.enable();
        return provider;
      },
    },
    authereum: {
      package: Authereum, // required
    },
  },
});

const App = (props) => {
  
  const mainnetProvider = poktMainnetProvider && poktMainnetProvider._isProvider ? poktMainnetProvider
    : mainnetInfura;
  
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  // connects wallet with web3Modal
  const loadWeb3Modal = useCallback(async () => { 
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));
  
    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });
  
    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });
  
    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);
  
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  /* 💵 gets ETH price from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 gets Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // information needed for account in context
  // use the information provided to context to display in account which is set in navBar
  return (

    <AppContextProvider>
      <BrowserRouter >
          <NavBar />
          <Route exact path="/" component={Home} />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
