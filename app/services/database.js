const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'alzare22_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
 
module.exports =  (query) => {
    return new Promise((resolve, reject) => { 
        pool.query(query, function (error, results, fields) {
            if (error) {
                console.log('Query error: ', error)
                reject("Query error");
            }
            resolve(results)
        });
    })
}