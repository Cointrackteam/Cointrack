import { Web3Storage } from 'web3.storage';
import { create } from 'ipfs-http-client';
const axios = require('axios');
import {csv} from 'd3-request';


const url = 'https://dweb.link/api/v0';


function getAccessToken(){
    return process.env.RAZZLE_WEB3STORAGE_TOKEN
}

function makeStorageClient(){
    return new Web3Storage({token: getAccessToken() })
}

async function checkStatus(cid){
    const client = makeStorageClient();
    const status = await client.status(cid);
    if (status){
        console.log(status);
    }
    return status;
}

async function listUploads() {  
    const client = makeStorageClient();
    const uploads = [];
    for await (const upload of client.list()) {    
        uploads.push({name: upload.name, cid: upload.cid, timestamp: upload.created});  
    }
    return uploads;
}

async function getLatestFileLink(){
    let links = await listUploads();
    let latestFile = links[0]
    let latest = new Date(links[0].timestamp);
    for (const link of links){
        if (new Date(link.timestamp) > latest){
            latest = new Date(link);
            latestFile = link;
        }
    }
    return latestFile
}

async function getLinks(ipfsPath) {  
    const ipfs = create({ url });
    const links = [];
    for await (const link of ipfs.ls(ipfsPath)){    
        console.log(link);
        links.push(link)  
    }  
    return links;
}


async function retrieve(cid) {  
    const client = makeStorageClient();
    const res = await client.get(cid);
    // console.log(`Got a response! [${res.status}] ${res.statusText}`)  
    if (!res.ok) {
        throw new Error(`failed to get ${cid}`)  
    }
  // request succeeded! do something with the response object here...
  return res;
}

export async function getLatestDbData(){
    let latestLink = await getLatestFileLink();
    let latestFile = await retrieve(latestLink.cid);
    let files = await latestFile.files();
    let res = await axios.get(web3StorageUrl(files[0].cid));     
    return res.data;
}

function web3StorageUrl(cid){
    return 'https://' + cid + ".ipfs.dweb.link";
}

function makeDbFile(obj){
    const jsonObj = JSON.stringify(obj); 
    console.log(jsonObj);
    const blob = new Blob([jsonObj], {type : "application/json"});
    return blob;
}

async function storeWithProgress(files, name) {    
    // show the root cid as soon as it's ready  
    const onRootCidReady = cid => {    
        console.log('uploading files with cid:', cid);  
    }
    // when each chunk is stored, update the percentage complete and display  
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0);  
    let uploaded = 0;
    const onStoredChunk = size => { 
        uploaded += size;
        const pct = totalSize / uploaded 
        console.log(`Uploading... ${pct.toFixed(2)}% complete`)  
    }
    const client = makeStorageClient()
    return client.put(files, { onRootCidReady, onStoredChunk, name: name})
}

async function storeFiles(files, name){
    const client = makeStorageClient();
    const cid = await client.put(files, {name: name, wrapWithDirectory: false});
    console.log('stored files with cid: ', cid);
    return cid;
}


export async function initializeDb(data){
    // extract csv
    let csvData = extractCSV(data);
    let jsonBlob, cid;
    setTimeout(async () => {
        jsonBlob = makeDbFile({db: csvData});
        console.log(jsonBlob);
        cid = await storeFiles([jsonBlob], "db-version-0.json");
    }, 1000);
    console.log(`db stored succesfully at ${cid}`)
}
 

export async function dbUpdate(newInputs){
    // retrieve latest db data
    let oldData = await getLatestDbData();
    let newData = {db: [...oldData.db, ...newInputs]}
    let jsonBlob = makeDbFile(newData);
    let uploads  = await listUploads(); 
    let err; 
    try {
        await storeFiles([jsonBlob], `db-version-${uploads.length}.json`); 
    } catch (e){
        console.log(e);
        err = e;
    }
    if (err) newData = oldData;
    return newData.db; // returns list of inputs
}

export function extractCSV(data){
    let db = []; 
    csv(data, (e, d) => {
        if(e)console.log(e);
        void d.map(data => db.push({exchangeAddress: data.exchangeAddress, exchangeName: data.exchangeName}));
    })
    return db
}

export function createdbMap(d){
    const db = new Map();
    void d.map(dataPoint => db.set(dataPoint.exchangeAddress, dataPoint.exchangeName));
    return db;
}