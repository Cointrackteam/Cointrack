import React, {useState, useEffect} from 'react'
import {Button, Col} from 'react-bootstrap';
import { useAddressHook } from '../hooks/addressHooks/useAddressHook';
import useLogger from '../hooks/useLogger';

export default function AccountAddressButton({callback}) {
    const [userAddress, setUserAddress ] = useState();
    
    useEffect(()=>{
        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(accounts => accounts[0].length > 0  ? setUserAddress(accounts[0]) : undefined)
        .catch(e => triggerWarning(e.message));
    }, [window.ethereum])
    
    const button = (
        <Col lg='5' >
            <Button className="btn-solid-sm" style={{width: "100%"}} onClick={() => callback("ethAddress", userAddress)} > 
                    Use wallet Address
            </Button>
        </Col>  
    ) 
    return (
        userAddress ? button : null
    )
}
