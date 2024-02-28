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
      console.log("Error getting events:", err);
    } else {
      console.log("Events fetched successfully");
      res.status(200).json({ message: "Event updated successfully" });
      res.send(result);
    }
  });
});

// Route to get an event
app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM events WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error getting event: " + id, err);
      res.status(500).send("Error getting event");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Event not found");
    } else {
      console.log("Event updated successfully");
      res.status(200).json({ message: "Event fetched successfully" });
      res.send(result);
    }
  });
});

// Route to create an event
app.post("/api/create", (req, res) => {
  const event_name = req.body.name;
  const event_desc = req.body.description;
  const ticket_vip_price = req.body.VIPTPrice;
  const ticket_reg_price = req.body.RegTPrice;
  const event_attendees = req.body.attendees;
  const booked_attendees = req.body.booked;

  db.query(
    "INSERT INTO events (name, description, VIPTPrice, RegTPrice, attendees, booked) VALUES (?,?,?,?,?,?)",
    [
      event_name,
      event_desc,
      ticket_vip_price,
      ticket_reg_price,
      event_attendees,
      booked_attendees,
    ],
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
  const event_id = req.params.id;
  const event_name = req.body.name;
  const event_desc = req.body.description;
  const ticket_vip_price = req.body.VIPTPrice;
  const ticket_reg_price = req.body.RegTPrice;
  const event_attendees = req.body.attendees;
  const booked_attendees = req.body.booked;
  db.query(
    "UPDATE events SET name=?, description=?, VIPTPrice=?, RegTPrice=?, attendees=?, booked=? WHERE id=?",
    [
      event_name,
      event_desc,
      ticket_vip_price,
      ticket_reg_price,
      event_attendees,
      booked_attendees,
      event_id,
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
      console.error("Error deleting event:", err);
      res.status(500).send("Error deleting event");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Event not found");
    } else {
      console.log("Event deleted successfully");
      res.status(200).json({ message: "Event updated successfully" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
