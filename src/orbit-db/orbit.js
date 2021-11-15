import { create } from 'ipfs-http-client';
const orbitDB = require('orbit-db');
const ipfs = require('ipfs');

const projectId = process.env.RAZZLE_INFURA_IPFS_SECRET
const projectSecret = process.env.RAZZLE_INFURA_IPFS_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
}); 

// Create IPFS instance
let options = { repo : './cointrack/databases/test', };
let dbInstance = ipfs.create(options)
.then(ipfsInstance => 
    orbitDB.createInstance(ipfsInstance)
    .then(orbitInstance => 
        orbitInstance.keyvalue('cointrack-test-db')
        .then(db => dbInstance = db)
    )
)
const db = dbInstance;
export default db;

// // Create OrbitDB instance
// const orbitdb = orbitDB.createInstance(ipfs).then(orbitInstance => orbitInstance);

// // create database instance
// let dbInstance = orbitdb.keyvalue('cointrack-test-db').then(db => db);

// const db = dbInstance;