const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "TicketPulse",
  password: "",
  database: "TicketPulse",
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Create the "events" table
const createEventsTableQuery = `
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    VIPTPrice DECIMAL(10, 2) NOT NULL,
    RegTPrice DECIMAL(10, 2) NOT NULL,
    attendees INT NOT NULL,
    booked INT NOT NULL
  )
`;
db.query(createEventsTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating events table:", err);
  } else {
    console.log("Events table created successfully");
  }
});

// Create the "tickets" table
const createTicketsTableQuery = `
  CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event INT,
    eventName VARCHAR(255),
    ticketType ENUM('VIP', 'Regular') NOT NULL,
    FOREIGN KEY (event) REFERENCES events(id)
  )
`;

db.query(createTicketsTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating tickets table:", err);
  } else {
    console.log("Tickets table created successfully");
  }
});

module.exports = db;
