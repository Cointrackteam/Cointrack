import React, {useState, useEffect} from 'react'
import {Button, Col} from 'react-bootstrap';
import { useAddressHook } from '../hooks/addressHooks/useAddressHook';
import useLogger from '../hooks/useLogger';

export default function AccountAddressButton({callback}) {
    const [address, setAddress] = useAddressHook([window.ethereum]);
    
    const button = (
        <Col lg='5' >
            <Button className="btn-solid-sm" style={{width: "100%"}} onClick={() => callback("ethAddress", address)} > 
                    Use wallet Address
            </Button>
        </Col>
    ) 
    return (
        address ? button : null
    )
}
