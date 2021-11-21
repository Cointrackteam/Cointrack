import React , {useState, useEffect} from 'react';

export default function useNetworkIdHook() {
    const [networkId, setNetworkId]  = useState();
    
    useEffect(async ()=> {
            setNetworkId(Number(window.ethereum.chainId));
    }, [networkId])

    return [networkId, setNetworkId];
}
