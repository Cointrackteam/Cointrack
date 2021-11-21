import React , {useState, useEffect} from 'react';

export function useAddressHook(triggers) {
    const [address, setAddress]  = useState(undefined);
    useEffect(async ()=>{
        window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(accounts => accounts[0].length > 0  ? setAddress(accounts[0]) : null).catch(e => console.log(e));
    }, [address, ...triggers])
    return [address, setAddress];
}
