import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Admin = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/get").then(response => {
      setEvents(response.data.data);
    });
  }, []);
  return (
    <div className="container admin">
      {events.length > 0 ? (
        events.map((event, key) => {
          return (
            <div className="event" key={key}>
              <div className="colR">
                <h2>{event.name}</h2>
                <p>{event.description}</p>
              </div>
              <div className="colR">
                <h3>VIP: {event.VIPTPrice}</h3>
                <h3>Regular: {event.RegTPrice}</h3>
              </div>
              <div className="colR">
                <p>Capacity: {event.attendees}</p>
                <p>Booked: {event.booked}</p>
                <p>Remaining: {event.attendees - event.booked}</p>
              </div>
              <div className="col4">
                <Link to={`/admin/events/${event.id}`}>
                  <FaEdit />
                  Edit
                </Link>
                {/* <Link to={`/events/${event.id}`}>
                  <GiTicket />
                  Book Regular Ticket
                </Link> */}
              </div>
            </div>
          );
        })
      ) : (
        <p className="altP">Loading...</p>
      )}
    </div>
  );
};

export default Admin;
