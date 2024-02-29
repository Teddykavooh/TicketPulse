import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

const Event = () => {
  const { id } = useParams();
  const [myEvent, setMyEvent] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8800/api/get/${id}`).then(response => {
      setMyEvent(response.data.data[0]);
    });
  }, [id]);

  console.log("This is my data: " + "\n", myEvent);

  return (
    <div className="container event-page">
      {Object.keys(myEvent).length > 0 ? (
        <div className="anEventV">
          <div className="singleEventCont">
            <h2>Event Details</h2>
            <p>
              Event Name: <span>{myEvent.name}</span>
            </p>
            <p>
              About Event: <span>{myEvent.description}</span>
            </p>
            <p>
              VIP Ticket Price: <span>{myEvent.VIPTPrice}</span>
            </p>
            <p>
              Regular Ticket Price: <span>{myEvent.RegTPrice}</span>
            </p>
            <p>
              Capacity: <span>{myEvent.attendees}</span>
            </p>
            <p>
              Booked: <span>{myEvent.booked}</span>
            </p>
            <p>
              Remaining: <span>{myEvent.attendees - myEvent.booked}</span>
            </p>
          </div>
          <div className="bookT">
            <div className="bView">
              <button>
                VIP Ticket <IoMdAddCircle />
              </button>
              <Counter />
            </div>
            <div className="bView">
              <button>
                Regular Ticket <IoMdAddCircle />
              </button>
              <Counter />
            </div>
          </div>
        </div>
      ) : (
        <p className="altP">Loading...</p>
      )}
    </div>
  );
};

export default Event;
