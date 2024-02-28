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

// Route to create an event
app.post("/api/create", (req, res) => {
  const event_name = req.body.name;
  const event_desc = req.body.eventDesc;
  const ticket_price = req.body.price;
  const ticket_type = req.body.ticketType;
  const event_attendees = req.body.attendees;

  db.query(
    "INSERT INTO events (name, desc, price, ticket_type, attendees) VALUES (?,?,?,?,?)",
    [event_name, event_desc, ticket_price, ticket_type, event_attendees],
    (err, result) => {
      if (err) {
        console.error("Error creating event:", err);
        res.status(500).send("Error creating event");
      } else {
        console.log("Event created successfully");
        res.status(201).json({
          message: "Event created successfully",
          eventId: result.insertId,
        });
      }
    },
  );
});

// Route to update an event
app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  // const eventId = req.params.eventId;
  const event_name = req.body.name;
  const event_description = req.body.eventDesc;
  const ticket_price = req.body.price;
  const ticket_type = req.body.ticketType;
  const event_attendees = req.body.attendees;
  db.query(
    "UPDATE events SET name=?, description=?, price=?, ticket_type=?, attendees=? WHERE id=?",
    [
      event_name,
      event_description,
      ticket_price,
      ticket_type,
      event_attendees,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating event:", err);
        res.status(500).send("Error updating event");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Event not found");
      } else {
        console.log("Event updated successfully");
        res.status(200).json({ message: "Event updated successfully" });
      }
    },
  );
});

// Route to delete an event
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM events WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
