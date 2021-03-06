import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { shortenAddress } from '../../utils/shortenAddress';
import { useAppContext } from '../../AppContext';

// wallet instance
const Wallet = ({loadWeb3Modal, logoutOfWeb3Modal}) => {
    const { injectedProvider } = useAppContext();

              
    return (
        <> 
            {!injectedProvider ? (
                <Button className="btn-solid-sm page-scroll" onClick={loadWeb3Modal}>
                    Connect
                </Button>
                ) : <Button className="btn-solid-sm page-scroll" onClick={logoutOfWeb3Modal}>
                        Disconnect
                        <Badge varient='light'>{shortenAddress(injectedProvider.selectedAddress)}</Badge>
                    </Button>
            }
        </>        
    )
}

export default Wallet;
