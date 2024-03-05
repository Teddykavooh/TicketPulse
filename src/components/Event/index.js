import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Event = () => {
  const { id } = useParams();
  const [myEvent, setMyEvent] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_HOST}/api/get/${id}`,
      );
      setMyEvent(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // console.log("This is my data: " + "\n", myEvent);

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
    if (!validateEmail(userEmail)) {
      alert("Please provide your email before reserving tickets.");
      return;
    } else if (!(vipCount + regularCount)) {
      alert("Please, add tickets.");
      return;
    }
    // Check existing reservations for the given email and event
    Axios.get(
      `${process.env.REACT_APP_HOST}/api/getReservations/${myEvent.id}/${userEmail}`,
    )
      .then(response => {
        const totalReservations = response.data.totalReservations;
        console.log("TotalReservations: ", totalReservations);

        if (totalReservations >= 5) {
          alert(
            "You have reached the maximum limit of reservations for this event.",
          );
        } else {
          // Proceed with the reservation

          // Determine the selected ticket type(s) and price
          let ticketTypeV, totalAmount;
          if (vipCount > 0 && regularCount > 0) {
            ticketTypeV = "Both";
            totalAmount =
              vipCount * myEvent.VIPTPrice + regularCount * myEvent.RegTPrice;
          } else if (vipCount > 0) {
            ticketTypeV = "VIP";
            totalAmount = vipCount * myEvent.VIPTPrice;
          } else {
            ticketTypeV = "Regular";
            totalAmount = regularCount * myEvent.RegTPrice;
          }

          //Determine pri

          const ticketData = {
            eventId: myEvent.id,
            eventName: myEvent.name,
            ticketType: ticketTypeV,
            vipTickets: vipCount,
            regularTickets: regularCount,
            amount: totalAmount,
            email: userEmail,
          };

          Axios.post("http://localhost:8800/api/reserveTicket", ticketData)
            .then(response => {
              console.log("Reservation successful:", response.data);
              alert("Reservation successful");
              fetchData();
            })
            .catch(error => {
              console.error("Error during reservation:", error);
              alert("Error during reservation");
            });
        }
      })
      .catch(error => {
        console.error("Error fetching existing reservations:", error);
      });
  };

  const validateEmail = email => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            <div className="emailForm">
              <label>Email:</label>
              <input
                type="email"
                placeholder="sth@sth.com"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
              />
            </div>
            <div className="rTicketsB" onClick={() => reserveTickets()}>
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
