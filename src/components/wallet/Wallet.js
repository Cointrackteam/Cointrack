import React, { useState, useCallback, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { options } from  './providers'; 
import { shortenAddress } from '../../utils/shortenAddress';
import { useAppContext } from '../../AppContext';
import Web3Modal from 'web3modal';

const ethers = require('ethers');
// console.log(web3Modal);

// wallet instance
const Wallet = () => {
  const web3Modal = new Web3Modal(options);
    
    const [injectedProvider, setInjectedProvider] = useState();
    const [userAddress, setUserAddress] = useState(); 
    const cexAddressMap = useAppContext();
    console.log(cexAddressMap);

    useEffect( () => {
        if (injectedProvider){
          console.log(injectedProvider != undefined)
            setUserAddress(shortenAddress(window.ethereum.selectedAddress));
        }
    }, [injectedProvider])

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
    }, [loadWeb3Modal]);


    // sets the provider for web3modal
    const loadWeb3Modal = useCallback(async () => {
        // const provider = await getProvider(); // creates a provider from web3modal
        const provider = await web3Modal.connect()
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
          console.log(code, reason)
          console.log(disconnect)
          logoutOfWeb3Modal().then(r => console.log('logged out'));
        });

    }, [setInjectedProvider]);

    // logs out of web3Modal 
    const logoutOfWeb3Modal = async () => {

        if (injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
          await injectedProvider.provider.disconnect();
        }
        if (injectedProvider.close){
          await injectedProvider.close();
        } 
        if (injectedProvider.disconnect){
          await injectedProvider.disconnect();
        }
        await web3Modal.clearCachedProvider();

        setTimeout(() => {
          window.location.reload();
        }, 1);
    }
    const buttons = !injectedProvider ? (
            <Button className="btn-solid-sm page-scroll" onClick={loadWeb3Modal}>
                Connect
            </Button>
            ) : (
                <Button className="btn-solid-sm page-scroll" onClick={logoutOfWeb3Modal}>
                    Disconnect
                    <Badge varient='light'>{userAddress}</Badge>
                </Button>
            )  
    return (
        <> 
            {buttons}               
        </>        
    )
}

export default Wallet;
