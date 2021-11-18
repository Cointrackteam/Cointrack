import React, { createContext, useReducer } from 'react';
import csxData from './static/db-data/csx-address-data.csv';
import {initializeDb, createdbMap, dbUpdate, getLatestDbData } from './web3-storage/web3-storage';

getLatestDbData().then(data => void data.db.map(point => dbMap.set(point.exchangeAddress, point.exchangeName)));
let dbMap = new Map();
// initializeDb(csxData);
const initialContext = {
  cexAddressMap: dbMap,
  setCEXAddress: () => {},
  analysisCompleted: false,
  toggleAnalysCompleted: () => {},
  analysisData: {},
  setAnalysisData: () => {}
  // getAddressName: () => {}, 
  // ethBalance: '--',
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DB':
      return {
        ...state, 
        cexAddressMap: new Map([...state.cexAddressMap, ...payload])
      };
    case 'TOGGLE_ANALYSIS_COMPLETED':
      return {
        ...state,
        analysisCompleted: !state.analysisCompleted
      };
    case 'SET_ANALYSIS_DATA': 
      return {
        ...state,
        analysisData: payload
      }
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
    },
    analysisCompleted: store.analysisCompleted,
    toggleAnalysCompleted: () => dispatch({type: "TOGGLE_ANALYSIS_COMPLETED"}),
    analysisData: store.analysisData, 
    setAnalysisData: payload => dispatch({type: 'SET_ANALYSIS_DATA', payload: payload})
    // some code to update store 
    // ethBalance: store.ethBalance,
    // setEthBalance: (balance) => {
    //   dispatch({ type: 'SET_ETH_BALANCE', payload: balance });
    // },
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
