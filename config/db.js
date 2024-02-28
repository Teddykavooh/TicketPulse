const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "TicketPulse",
  password: "",
  database: "TicketPulse",
});

module.exports = db;
