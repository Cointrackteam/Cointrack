import React, { useState, useCallback, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { shortenAddress } from '../../utils/shortenAddress';


// wallet instance
const Wallet = ({loadWeb3Modal, logoutOfWeb3Modal, providerOrSigner, userAddress}) => {

              
    return (
        <> 
            {!providerOrSigner ? (
                <Button className="btn-solid-sm page-scroll" onClick={loadWeb3Modal}>
                    Connect
                </Button>
                ) : <Button className="btn-solid-sm page-scroll" onClick={logoutOfWeb3Modal}>
                        Disconnect
                        <Badge varient='light'>{shortenAddress(userAddress)}</Badge>
                    </Button>
            }
        </>        
    )
}

export default Wallet;
