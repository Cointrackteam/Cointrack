import axios from 'axios';
import { greenscreen } from 'base16';

const apiKey = process.evn.RAZZLE_ETHERSCAN_KEY
const baseUrl = "https://api.etherscan.io/api"

async function requestAction(type, payload){  
    switch(type){
        case 'get_account_transactions':
            axios.create({baseUrl: baseUrl, method: 'get'});
            let url = `?module=account&actions=txlist&address${payload}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
            let res;
            try {
                res = await axios.get(url);
            } catch (e){
                res = e;
            }
            return res;
        default:
            let res;
            try {
                res = await axios.get(payload);
            } catch (e){
                res = e;
            }
            return res;
        } 
}

// https://api.etherscan.io/api?module=account&actions=txlist&address=0xa322BAfebb305bf55EAD5E03Fd6372c2574df6a3&startblock=0&endblock=99999999&sort=asc&apikey=7I4ZAYFAX1R7K4ZHXBMI315MY6UEQ7WZND