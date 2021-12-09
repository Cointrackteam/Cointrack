import React, {useState, useEffect} from 'react'
import {Button, Col} from 'react-bootstrap';
import { useAppContext } from '../AppContext'; 

export default function AccountAddressButton({callback}) {
    const { injectedProvider } = useAppContext();

    
    const button = (
        <Col lg='5' >
            <Button className="btn-solid-sm" style={{width: "100%"}} onClick={() => callback("ethAddress", injectedProvider.selectedAddress )} > 
                    Use wallet Address
            </Button>
        </Col>  
    ) 
    return (
        injectedProvider ? button : null
    )
}
