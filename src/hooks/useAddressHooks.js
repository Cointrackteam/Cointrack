import React , {useState, useEffect} from 'react'

export function useIsAccountLoggedIn(triggers) {
    const [address, setAddress]  = useState(undefined);

    useEffect(async ()=>{
        window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(accounts => accounts[0].length > 0  ? setAddress(accounts[0]) : null);
    }, [address, ...triggers])

    return address;
}
