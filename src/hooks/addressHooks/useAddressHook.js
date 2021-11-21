import React , {useState, useEffect} from 'react';
import { useAlert } from '../alertsHooks/useAlertHook';

export function useAddressHook(provider) {
    const [address, setAddress]  = useState(" ");
    const [ , triggerWarning] = useAlert(
        '',
        'bottom-right',
        'info',
        1.5
    )     
    useEffect(async ()=>{
        if(provider){
            window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(accounts => accounts[0].length > 0  ? setAddress(accounts[0]) : null)
                .catch(e => triggerWarning(e.message));
        }
    }, [provider])
    
    return [address, setAddress];
}
