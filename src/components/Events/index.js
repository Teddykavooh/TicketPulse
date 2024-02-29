import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { GiTicket } from "react-icons/gi";
import { RiVipCrownFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/get").then(response => {
      setEvents(response.data.data);
    });
  }, []);

  // console.log("This is my data: " + "\n", events);

  return (
    <div className="main">
      <div className="eventCont">
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
                  <Link to={`/events/${event.id}`}>
                    <RiVipCrownFill />
                    <GiTicket />
                    Book VIP Ticket
                  </Link>
                  <Link to={`/events/${event.id}`}>
                    <GiTicket />
                    Book Regular Ticket
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="altP">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Events;
