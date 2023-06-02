import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function BookTicket({ match }) {
  const history = useHistory();
  const [show, setShow] = useState({});
  const [emailValid, setEmailValid] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.tvmaze.com/shows/${match.params.id}`);
      setShow(result.data);
    };

    fetchData();
  }, [match.params.id]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    setNameValid("");
    setEmailValid("");

    if (userDetails.name === "") {
      setNameValid("Name is require");
      return;
    }
    if (userDetails.email === "") {
      setEmailValid("Email is require");
      return;
    }
    if (!EMAIL_REGEX.test(userDetails.email)) {
      setEmailValid("Invalid Email");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    alert("Ticket booked successfully!");
    history.push("/");
  };

  return (
    <div className="booking-page">
      <div className="booking-box">
        <h1 className="booking-heading">{show.name}</h1>
        <div className="booking-form">
          <div className="booking-input-box">
            <div>Name</div>
            <input
              className="booking-input"
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
            <div className="input-required">{nameValid}</div>
          </div>
          <div className="booking-input-box">
            <div>Email</div>
            <input
              className="booking-input"
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <div className="input-required">{emailValid}</div>
          </div>

          <button className="booking-button" onClick={handleSubmit}>
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
