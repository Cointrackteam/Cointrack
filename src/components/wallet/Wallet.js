import React, { useState, useCallback, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { options } from  './providers'; 
import { shortenAddress } from '../../utils/shortenAddress';
import { useAppContext } from '../../AppContext';
import {useAddressHook} from '../../hooks/addressHooks/useAddressHook';

import Web3Modal from 'web3modal';

const ethers = require('ethers');

// wallet instance
const Wallet = () => {
  const web3Modal = new Web3Modal(options);
    
    const [injectedProvider, setInjectedProvider] = useState();
    const [address] = useAddressHook([injectedProvider]) 

    // useEffect( () => {
    //     if (injectedProvider){

    //     }
    // }, [injectedProvider])

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
    }, [loadWeb3Modal]);


    // sets the provider for web3modal
    const loadWeb3Modal = useCallback(async () => {
        // const provider = await getProvider(); // creates a provider from web3modal
        let provider;
        try {
          provider = await web3Modal.connect()
        } catch (e){
          console.log(e);
        }
        if (provider) {

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
    const buttons = !injectedProvider ? (
            <Button className="btn-solid-sm page-scroll" onClick={loadWeb3Modal}>
                Connect
            </Button>
            ) : (
                <Button className="btn-solid-sm page-scroll" 
                style={{
                  fontSize: '1rem',
                  padding: "0.75rem 1rem 0.75rem 1rem"
                }}
                onClick={logoutOfWeb3Modal}>
                    Disconnect
                    <Badge pill variant="info">{shortenAddress(address)}</Badge>
                </Button>
            )  
    return (
        <> 
            {buttons}               
        </>        
    )
}

export default Wallet;
