import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const AdminEvent = () => {
  const { id } = useParams();
  const [myEvent, setMyEvent] = useState([]);

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

  return (
    <div className="container adminEvent">
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
              <MdDelete />
              <FaEdit />
              {/* <div className="bView">
                <div className="col">
                  <label>VIP Tickets</label>
                  <div className="rCol">
                    <IoMdAddCircle onClick={() => handleIncrement("VIP")} />
                    <IoMdRemoveCircle onClick={() => handleDecrement("VIP")} />
                  </div>
                </div>
                <span>{vipCount}</span>
              </div> */}
              {/* <div className="bView">
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
              </div> */}
            </div>
            {/* <div className="emailForm">
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
            </div> */}
          </div>
        </div>
      ) : (
        <p className="altP">Loading...</p>
      )}
    </div>
  );
};

export default AdminEvent;
