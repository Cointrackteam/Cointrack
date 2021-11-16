import React, { createContext, useReducer } from 'react';
import {csv} from 'd3-request';
import csxData from './static/db-data/csx-address-data.csv';

const db = new Map();

csv(csxData, (e, d) => {
  if(e)console.log(e);
  void d.map(dataPoint => db.set(dataPoint.exchangeAddress, dataPoint.exchangeName));
})

const initialContext = {
  cexAddressMap: db,
  setCEXAddress: () => {}
  // getAddressName: () => {}, 
  // ethBalance: '--',

};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CEX_ADDRESS':
      return new Map([...state]).set(payload.key, payload.value);
    // case 'SET_ETH_BALANCE':
    //   return {
    //     ...state,
    //     ethBalance: payload,
    //   };


    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    cexAddressMap: store.cexAddressMap,
    setCEXAddress: (keypair) => {
      dispatch({type: "SET_CEX_ADDRESS", payload: keypair});
      // update csv
    }

    // some code to update store 
    // ethBalance: store.ethBalance,
    // setEthBalance: (balance) => {
    //   dispatch({ type: 'SET_ETH_BALANCE', payload: balance });
    // },

  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
