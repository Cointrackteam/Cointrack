import axios from 'axios';
const utils = require('ethers').utils; 
const ethPriceUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
const servicePrice = process.env.RAZZLE_SERVICE_PRICE;
const serviceProvider = process.env.RAZZLE_SERVICE_PROVIDER;


async function calculateTosend(){
  const res = await axios.get(ethPriceUrl);
  const current = res.data.ethereum.usd;
  return Number(servicePrice) / Number(current);  
}

export async function payForAnalysis(id, signerAddress){
  
  const toSend = await calculateTosend();
  let toSendParsed = await utils.parseUnits(String(toSend.toFixed(9)), 'ether');
  
  const tx = {
    from: signerAddress,
    to: serviceProvider,
    chainId: id,
    value: toSendParsed._hex
  }
  
  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx]
  }) 

  return txHash
} 