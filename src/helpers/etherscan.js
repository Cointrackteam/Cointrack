import axios from 'axios';
const apiKey = process.env.RAZZLE_ETHERSCAN_KEY
const baseUrl = "https://api.etherscan.io/api"

export async function requestAction(type, payload){  
    let res;
    switch(type){
        case 'get_account_transactions':
            let url = `?module=account&action=txlist&address=${payload}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
            try {
                let counter = 0;
                res = await axios.get(baseUrl + url);
                while (res.status !== 200){
                    if (counter > 9 && res.status !== 200){
                        throw new Error("something went wrong with fetching user transactions");
                    }
                    res = await requestAction('get_account_transactions', data.ethAddress);
                    counter++;
                }
                return res.data;
            } catch (e){
                return e;
            }
        default:
            try {
                res = await axios.get(payload);
            } catch (e){
                res = e;
            }
            return res;
        } 
}

// https://api.etherscan.io/api?module=account&actions=txlist&address=0xa322BAfebb305bf55EAD5E03Fd6372c2574df6a3&startblock=0&endblock=99999999&sort=asc&apikey=7I4ZAYFAX1R7K4ZHXBMI315MY6UEQ7WZND