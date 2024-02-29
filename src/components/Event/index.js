import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Event = () => {
  const { id } = useParams();
  const [myEvent, setMyEvent] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8800/api/get/${id}`).then(response => {
      setMyEvent(response.data.data[0]);
    });
  }, [id]);

  // console.log("This is my data: " + "\n", myEvent);

  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  const handleIncrement = ticketType => {
    const totalTickets = vipCount + regularCount;
    if (totalTickets < 5) {
      if (ticketType === "VIP" && vipCount < 5) {
        setVipCount(vipCount + 1);
      } else if (ticketType === "Regular" && regularCount < 5) {
        setRegularCount(regularCount + 1);
      }
    }
  };

  const handleDecrement = ticketType => {
    const totalTickets = vipCount + regularCount;

    if (totalTickets > 0) {
      if (ticketType === "VIP" && vipCount > 0) {
        setVipCount(vipCount - 1);
      } else if (ticketType === "Regular" && regularCount > 0) {
        setRegularCount(regularCount - 1);
      }
    }
  };

  const reserveTickets = () => {
    // Determine the selected ticket type(s)
    let ticketTypeV;
    if (vipCount > 0 && regularCount > 0) {
      ticketTypeV = "Both";
    } else if (vipCount > 0) {
      ticketTypeV = "VIP";
    } else {
      ticketTypeV = "Regular";
    }

    const ticketData = {
      eventId: myEvent.id,
      eventName: myEvent.name,
      ticketType: ticketTypeV,
      vipTickets: vipCount,
      regularTickets: regularCount,
    };

    Axios.post("http://localhost:8800/api/reserveTickets", ticketData)
      .then(response => {
        console.log("Reservation successful:", response.data);
      })
      .catch(error => {
        console.error("Error during reservation:", error);
      });
  };

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
            <div className="row1">
              <div className="bView">
                <div className="col">
                  <label>VIP Tickets</label>
                  <div className="rCol">
                    <IoMdAddCircle onClick={() => handleIncrement("VIP")} />
                    <IoMdRemoveCircle onClick={() => handleDecrement("VIP")} />
                  </div>
                </div>
                <span>{vipCount}</span>
              </div>
              <div className="bView">
                <div className="col">
                  <label>Regular Tickets</label>
                  <div className="rCol">
                    <IoMdAddCircle onClick={() => handleIncrement("Regular")} />
                    <IoMdRemoveCircle
                      onClick={() => handleDecrement("Regular")}
                    />
                  </div>
                </div>
                <span>{regularCount}</span>
              </div>
            </div>
            <div className="rTicketsB" onClick={() => console.log("Pressed")}>
              Reserve Tickets
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
