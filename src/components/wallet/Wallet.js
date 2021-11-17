import React, { useState, useCallback, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { getProvider, web3Modal } from  './providers'; 
import { shortenAddress } from '../../utils/shortenAddress';
import { useAppContext } from '../../AppContext';

const ethers = require('ethers');

// wallet instance
const Wallet = () => {
    
    const [injectedProvider, setInjectedProvider] = useState();
    const [userAddress, setUserAddress] = useState(); 
    // const cexAddressMap = useAppContext().cexAddressMap;
    // console.log(objs)
    

    useEffect( () => {
        if (injectedProvider){
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
        const provider = await getProvider(); // creates a provider from web3modal 
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

    // logs out of web3Modal 
    const logoutOfWeb3Modal = async () => {
        await web3Modal.clearCachedProvider();
        if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
          await injectedProvider.provider.disconnect();
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
