// const mysql = require("mysql2");
// const env = require("../env");

// console.log(env('APP_NAME'))

// const pool = mysql.createPool({
//   host: env("DB_HOST"),
//   user: env("DB_USER"),
//   password: env("DB_PASS"),
//   database: env("DB_NAME"),
//   port: env("DB_PORT"),
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// });

// module.exports.query = (query) => {
//   return new Promise((resolve, reject) => {
//     pool.query(query, function (error, results, fields) {
//       if (error) {
//         console.log("Query error: ", error);
//         reject("Query error");
//       }
//       resolve(results);
//     });
//   });
// };
