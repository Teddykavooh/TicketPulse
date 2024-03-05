import "./index.scss";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

const CreateEvent = () => {
  const navigator = useNavigate();
  // const { id } = useParams();
  // const [myEvent, setMyEvent] = useState([]);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVIPTPrice, setEditVIPTPrice] = useState();
  const [editRegTPrice, setEditRegTPrice] = useState();
  const [editAttendees, setEditAttendees] = useState();

  const createEvent = async () => {
    if (
      !editName ||
      !editDescription ||
      !editVIPTPrice ||
      !editRegTPrice ||
      !editAttendees
    ) {
      alert("Please fill in all the fields before creating the event.");
      return;
    }

    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_HOST}/api/create`,
        eventDetails,
      );
      // console.log("my data: ", response.status);
      if (response.status === 200 || response.status === 201) {
        // console.log(response.data.message);
        alert(response.data.message);
        navigator("/admin");
      } else {
        // console.log("Error updating event");
        alert("Error creating event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eventDetails = {
    name: editName,
    description: editDescription,
    VIPTPrice: editVIPTPrice,
    RegTPrice: editRegTPrice,
    attendees: editAttendees,
    booked: 0,
  };

  return (
    <div className="container createEventPage">
      <div className="cEventCont">
        <h2>Create an event ...</h2>
        <h3>&lt;Event Details /&gt;</h3>
        <p>
          Event Name:
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            // onBlur={() => setEditMode(false)}
          />
        </p>
        <p>
          About Event:
          <input
            type="text"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            // onBlur={() => setEditMode(false)}
          />
        </p>
        <p>
          VIP Ticket Price:
          <input
            type="text"
            value={editVIPTPrice}
            onChange={e => setEditVIPTPrice(e.target.value)}
            // onBlur={() => setEditMode(false)}
          />
        </p>
        <p>
          Regular Ticket Price:
          <input
            type="text"
            value={editRegTPrice}
            onChange={e => setEditRegTPrice(e.target.value)}
            // onBlur={() => setEditMode(false)}
          />
        </p>
        <p>
          Capacity:
          <input
            type="text"
            value={editAttendees}
            onChange={e => setEditAttendees(e.target.value)}
            // onBlur={() => setEditMode(false)}
          />
        </p>
        {/* <p>
          Booked: <span>{myEvent.booked}</span>
        </p>
        <p>
          Remaining: <span>{myEvent.attendees - myEvent.booked}</span>
        </p> */}
        <div
          className="createB"
          onClick={() => {
            createEvent();
          }}
        >
          <IoCreate />
          <p>Create</p>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
