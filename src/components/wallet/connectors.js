import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAINIDS } from '../../constants';

export const injectedConnecter = new InjectedConnector({
    supportedChainIds: CHAINIDS()
});
