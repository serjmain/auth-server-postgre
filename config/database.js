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
