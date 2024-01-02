import React from "react";
import "./YoutubeCard.css";
import { Button, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteYoutube, getUser } from "../../redux/action/user";

const YoutubeCard = ({
  id,
  url = "https://www.youtube.com/@isroofficial5866",
  title = "title here",
  image,
  isAdmin = false,
  loading
}) => {

  const dispatch = useDispatch();

  const deleteHandler = async(id) =>{
    await dispatch(deleteYoutube(id));
    setTimeout(() => {
      dispatch(getUser());
    }, 1400);
  };


  return (
    <div className="youtubeCard">
      <a href={url} target="blank">
        <img src={image} alt="video" />
        <Typography>{title}</Typography>
      </a>
      {isAdmin && (
        <Button
        style={{
          margin: "auto",
          display: "block",
          color: "rgba(40,40,40,0.7)",
        }}
        onClick={()=>deleteHandler(id)}
        disabled={loading}
        >
          <FaTrash />
        </Button>
      )}
    </div>
  );
};

export default YoutubeCard;
