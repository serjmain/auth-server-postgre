/* const Client = require('pg').Client;
const tt = 'postgres://ijemtnwoquhzuk:b705a2ff0ac3df00d93ba9e244a8d4bd618bf0f8f48dd4daf1f6ae334f3b6d73@ec2-52-203-118-49.compute-1.amazonaws.com:5432/dfjqm4b3t0ntdd';
module.exports = new Client(tt) */


const Client = require('pg').Client;
module.exports = new Client({
    user: 'ijemtnwoquhzuk',
    password: 'b705a2ff0ac3df00d93ba9e244a8d4bd618bf0f8f48dd4daf1f6ae334f3b6d73',
    host: 'ec2-52-203-118-49.compute-1.amazonaws.com',
    port: '5432'   ,
    database: 'dfjqm4b3t0ntdd',
    ssl: {
        rejectUnauthorized: false
    },
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0    
})

/* const Client = require('pg').Client;
module.exports = new Client({
    user: 'postgres',
    password: 'myguard',
    host: 'localhost',
    port: '5432'   ,
    database: 'postgres'    
})
 */






















/* const { Client } = require("cassandra-driver");

module.exports = new Client({
    keyspace: "auth",
    cloud: {
        secureConnectBundle: "./secure-connect-authmyguard.zip",
    },
    credentials: {
        username: "ciTZeBCKIrRxSaHzWTGRxjSe",
        password: "_PBW7nPOuo.1ukLsL.pIFYLu7x-Dl+QDAacer+unBjejr07Azp6CfwN7bDOOvF,pct49W-weFv,MLunnE,LhIZ1OTjt58aDg7bJmYDR+zX91kHHzqfnxLt80.WI0Hucj",
    },
}); */