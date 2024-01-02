import React, { useEffect, useState } from "react";
import "./Contact.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { contact } from "../../redux/action/user";
import toast from "react-hot-toast";

const Contact = () => {
  const dispatch = useDispatch();
  const {
    message: successMessage,
    error,
    loading,
  } = useSelector((state) => state.update);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(contact(name, email, message));
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, successMessage, error]);

  return (
    <div className="contact">
      <div className="contactRightBar"></div>

      <div className="contactContainer">
        <form className="contactContainerForm" onSubmit={contactFormHandler}>
          <Typography variant="h4">Contact</Typography>

          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            required
            cols="30"
            row="10"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <Button variant="contained" type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
