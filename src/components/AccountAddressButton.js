import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import { useIsAccountLoggedIn } from '../hooks/useAddressHooks';

export default function AccountAddressButton({callback}) {
    // const [address, setAddress] = useState();
    const address = useIsAccountLoggedIn([window]);
    
    // function isAccountLogged(){
    //     window.ethereum.request({ method: 'eth_requestAccounts'})
    //     .then(accounts => accounts[0].length > 0  ? setAddress(accounts[0]) : null);
    // }
    
    useEffect(()=>{
        // isAccountLogged();
    }, [address])
    
    const button = (
        <div className="form-group">
            <Button className="btn-solid-sm" onClick={() => callback("ethAddress", address)}> 
                Use wallet Address
            </Button>
        </div>
    ) 
    return (
        address ? button : null
    )
}
