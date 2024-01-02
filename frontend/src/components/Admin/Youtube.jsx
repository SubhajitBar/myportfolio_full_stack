import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addYoutube, getUser } from "../../redux/action/user";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { MdKeyboardBackspace } from "react-icons/md";
import YoutubeCard from "../YoutubeCard/YoutubeCard";

const Youtube = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addYoutube(url, title, image));
    setTimeout(() => {
      dispatch(getUser());
    }, 1400);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      };
    };
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 1000 });
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message, { duration: 1000 });
      dispatch({ type: "clearMessage" });
    }
    if (loginMessage) {
      toast.success(loginMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />

          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="adminPanelYoutubeVideos">
          {user &&
            user.youtube &&
            user.youtube.map((item) => (
              <YoutubeCard
                id={item._id}
                key={item._id}
                url={item.url}
                title={item.title}
                image={item.image.url}
                isAdmin={true}
                loading={loading}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube;
