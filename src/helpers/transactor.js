import axios from 'axios';
const utils = require('ethers').utils; 
const ethPriceUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
const servicePrice = process.env.RAZZLE_SERVICE_PRICE;
const serviceProvider = process.env.RAZZLE_SERVICE_PROVIDER;
// const targetNetwork = process.env.RAZZLE_TARGET_NETWORK === 'test' ? 4 : 1;
const ethers = require('ethers'); 

async function calculateTosend(){
  const res = await axios.get(ethPriceUrl);
  const current = res.data.ethereum.usd;
  return Number(servicePrice) / Number(current);  
}

export async function payForAnalysis(provider){
  const signer = new ethers.providers.Web3Provider(provider).getSigner();
  const toSend = await calculateTosend();
  let toSendParsed = await utils.parseUnits(String(toSend.toFixed(9)), 'ether');
  
  const tx = {
    to: serviceProvider,
    value: toSendParsed._hex
  }
  
  return signer.sendTransaction(tx);

} 