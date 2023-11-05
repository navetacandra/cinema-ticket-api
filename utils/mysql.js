const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "cinema_ticketing",
});
let errConnection = null;
connection.connect(function (err) {
  if (err) {
    console.log("Error MySQL Connection:", err);
    errConnection = {
      errno: err.errno,
      fatal: err.fatal,
      fieldCount: err.fieldCount,
      message: err.message,
      name: err.name,
      sql: err.sql,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      sqlStateMarker: err.sqlStateMarker,
    };
  }
});

function query(sql) {
  return new Promise((resolve, reject) => {
    if (errConnection) reject(errConnection);
    connection.query(sql, function (errQuery, result) {
      if (errQuery) {
        reject({
          errno: errQuery.errno,
          fatal: errQuery.fatal,
          fieldCount: errQuery.fieldCount,
          message: errQuery.message,
          name: errQuery.name,
          sql: errQuery.sql,
          sqlMessage: errQuery.sqlMessage,
          sqlState: errQuery.sqlState,
          sqlStateMarker: errQuery.sqlStateMarker,
        });
      }
      resolve(result);
    });
  });
}

module.exports = { query };
