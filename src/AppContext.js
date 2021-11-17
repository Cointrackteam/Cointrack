import React, { createContext, useReducer } from 'react';
import csxData from './static/db-data/csx-address-data.csv';
import {initializeDb, createdbMap, dbUpdate, getLatestDbData } from './web3-storage/web3-storage';
// initializeDb(csxData);
;
getLatestDbData().then(data => void data.db.map(point => dbMap.set(point.exchangeAddress, point.exchangeName)));
let dbMap = new Map();
const initialContext = {
  cexAddressMap: dbMap,
  setCEXAddress: () => {}
  // getAddressName: () => {}, 
  // ethBalance: '--',
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DB':
      return new Map([...state, ...payload]);
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
    setCEXAddress: async (payload) => {
      const newData = await dbUpdate(payload);
      const newMap = createdbMap(newData);  
      dispatch({type: "UPDATE_DB", payload: newMap});
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
