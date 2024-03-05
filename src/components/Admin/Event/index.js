import "./index.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";

const AdminEvent = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [myEvent, setMyEvent] = useState([]);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState(myEvent.description);
  const [editVIPTPrice, setEditVIPTPrice] = useState(myEvent.VIPTPrice);
  const [editRegTPrice, setEditRegTPrice] = useState(myEvent.RegTPrice);
  const [editAttendees, setEditAttendees] = useState(myEvent.attendees);
  const [editBooked, setEditBooked] = useState(myEvent.booked);
  const [editMode, setEditMode] = useState(false);
  const [updated, setUpdated] = useState(false);

  // console.log("EditMode: ", editMode);
  // console.log("my data: ", myEvent);
  // console.log("my data[]: ", editName);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_HOST}/api/get/${id}`,
      );
      setMyEvent(response.data.data[0]);
      setEditName(response.data.data[0].name);
      setEditDescription(response.data.data[0].description);
      setEditVIPTPrice(response.data.data[0].VIPTPrice);
      setEditRegTPrice(response.data.data[0].RegTPrice);
      setEditAttendees(response.data.data[0].attendees);
      setEditBooked(response.data.data[0].booked);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, updated]);

  const updateEvent = async () => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_HOST}/api/update/${id}`,
        updatedEventData,
      );
      if (response.status === 200) {
        // console.log(response.data.message);
        alert(response.data.message);
        setEditMode(false);
        setUpdated(!updated);
      } else {
        // console.log("Error updating event");
        alert("Error updating event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updatedEventData = {
    name: editName,
    description: editDescription,
    VIPTPrice: editVIPTPrice,
    RegTPrice: editRegTPrice,
    attendees: editAttendees,
    booked: editBooked,
  };

  const deleteEvent = async () => {
    try {
      const response = await Axios.delete(
        `${process.env.REACT_APP_HOST}/api/delete/${id}`,
      );
      // console.log("Feed: ", response);
      if (response.status === 200) {
        // console.log(response.data.message);
        alert(response.data.message);
        navigator("/admin");
      } else if (response.status === 404) {
        // console.log("Event not found");
        alert("Event not found");
      } else {
        // console.log("Error deleting event");
        alert("Error deleting event");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container adminEvent">
      {Object.keys(myEvent).length > 0 ? (
        <div className="anEventV">
          <div className="singleEventCont">
            <h2>Event Details</h2>
            <h3>
              {editMode ? (
                <span>&lt;Edit Mode /&gt;</span>
              ) : (
                <span>&lt;View Mode /&gt;</span>
              )}
            </h3>
            <p>
              Event Name:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  // onBlur={() => setEditMode(false)}
                />
              ) : (
                <span>{myEvent.name}</span>
              )}
            </p>
            <p>
              About Event:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  // onBlur={() => setEditMode(false)}
                />
              ) : (
                <span>{myEvent.description}</span>
              )}
            </p>
            <p>
              VIP Ticket Price:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editVIPTPrice}
                  onChange={e => setEditVIPTPrice(e.target.value)}
                  // onBlur={() => setEditMode(false)}
                />
              ) : (
                <span>{myEvent.VIPTPrice}</span>
              )}
            </p>
            <p>
              Regular Ticket Price:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editRegTPrice}
                  onChange={e => setEditRegTPrice(e.target.value)}
                  // onBlur={() => setEditMode(false)}
                />
              ) : (
                <span>{myEvent.RegTPrice}</span>
              )}
            </p>
            <p>
              Capacity:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editAttendees}
                  onChange={e => setEditAttendees(e.target.value)}
                  // onBlur={() => setEditMode(false)}
                />
              ) : (
                <span>{myEvent.attendees}</span>
              )}
            </p>
            <p>
              Booked: <span>{myEvent.booked}</span>
            </p>
            <p>
              Remaining: <span>{myEvent.attendees - myEvent.booked}</span>
            </p>
          </div>
          <div className="bookT">
            <div className="row">
              <div
                className="iconP"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                <ImEnter />
                <p>Enter Edit Mode</p>
              </div>
              <div
                className="iconP"
                onClick={() => {
                  console.log("Create");
                  navigator("/admin/create_event");
                }}
              >
                <MdAddBox />
                <p>Create an event</p>
              </div>
            </div>
            <div className="row">
              <div
                className="iconP"
                onClick={() => {
                  deleteEvent();
                }}
              >
                <MdDelete />
                <span className="iconSpan">Delete Event</span>
              </div>
              <div
                className="iconP"
                onClick={() => {
                  editMode ? updateEvent() : alert("Try editing something.");
                }}
              >
                <FaEdit />
                <span className="iconSpan">Edit Event</span>
              </div>

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
