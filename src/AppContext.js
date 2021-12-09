import React, { createContext, useReducer } from 'react';
import csxData from './static/db-data/csx-address-data.csv';
import {initializeDb, createdbMap, dbUpdate, getLatestDbData } from './web3-storage/web3-storage';

const initialContext = {
  cexAddressData: undefined,
  setCEXAddressData: async () => {},
  updateCEXAddressData: async () => {},
  injectedProvider: undefined, 
  setInjectedProvider: () => {},
  analysisResults: undefined,
  setAnalysisResults: () => {},
  isAnalysisCompleted: false,
  toggleAnalysCompleted: () => {},
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CEX_DATA':
      return {
        ...state,
        cexAddressData: new Map([...payload])
      }
    case 'UPDATE_CEX_DATA':
      return {
        ...state, 
        cexAddressData: new Map([...state.cexAddressMap, ...payload])
      };
    case 'TOGGLE_ANALYSIS_COMPLETED':
      return {
        ...state,
        isAnalysisCompleted: !state.analysisCompleted
      };
    case 'SET_ANALYSIS_RESULTS': 
      return {
        ...state,
        analysisResults: {
          clientAddress: payload.clientAddress,
          results: payload.results
        }
      };
    case 'SET_INJECTED_PROVIDER': 
      return {
        ...state,
        injectedProvider: payload
      }; 
    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    cexAddressData: store.cexAddressData,
    setCEXAddressData: async () => {
      let data = await getLatestDbData();
      dispatch({type: 'SET_CEX_DATA', payload: data.db.map(obj => [ obj[Object.keys(obj)[0]], obj[Object.keys(obj)[1]] ]) });
    },
    updateCEXAddressData: async (payload) => {
      await dbUpdate(payload); // update on ipfs
      dispatch({type: "UPDATE_CEX_DATA", payload: payload}); // update store
    },
    isAnalysisCompleted: store.isAnalysisCompleted,
    toggleAnalysCompleted: () => dispatch({type: "TOGGLE_ANALYSIS_COMPLETED"}),
    analysisResults: store.analysisResults, 
    setAnalysisResults: payload => dispatch({type: 'SET_ANALYSIS_RESULTS', payload: payload}),
    injectedProvider: store.injectedProvider,
    setInjectedProvider: payload => dispatch({type: 'SET_INJECTED_PROVIDER', payload: payload})
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
