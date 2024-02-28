const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 8800;
app.use(cors());
app.use(express.json());

// My Routes

// Route to get all events
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get an event
app.get("/api/get/:id", (req, res) => {
  db.query("SELECT * FROM events WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
