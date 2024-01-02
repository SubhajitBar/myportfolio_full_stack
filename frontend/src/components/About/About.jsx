import React from "react";
import "./About.css";
import { Typography } from "@mui/material";

const About = ({ about }) => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <Typography>{about.quote}</Typography>
      </div>

      <div className="aboutContainer2">
        <div>
          <img
            src={about.avatar.url}
            alt="ProfilePic"
            className="aboutAvatar"
          />

          <Typography variant="h4">{about.name}</Typography>
          <Typography>{about.title}</Typography>
          <Typography>{about.subtitle}</Typography>
        </div>

        <div>
          <Typography>{about.description}</Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
