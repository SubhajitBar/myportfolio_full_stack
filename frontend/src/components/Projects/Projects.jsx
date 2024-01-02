import React from "react";
import "./Projects.css";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AiOutlineProject } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteProject, getUser } from "../../redux/action/user";

export const ProjectCard = ({
  id,
  url,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false,
  loading,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteProject(id));
    setTimeout(() => {
      dispatch(getUser());
    }, 1400);
  };

  return (
    <>
      <a href={url} className="projectCard" target="blank" >
        <div>
          <img src={projectImage} alt="ProjectImage" />
          <Typography variant="h5">{projectTitle}</Typography>
        </div>
        <div>
          <Typography variant="h4">About Project</Typography>
          <Typography>{description}</Typography>
          <Typography variant="h6">Tech Stack : {technologies}</Typography>
        </div>
      </a>

      {isAdmin && (
        <Button
          style={{
            margin: "auto",
            display: "block",
            color: "rgba(40,40,40,0.7)",
          }}
          onClick={() => deleteHandler(id)}
          disabled={loading}
        >
          <Delete />
        </Button>
      )}
    </>
  );
};

const Projects = ({ projects }) => {
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <AiOutlineProject />
      </Typography>

      <div className="projectsWrapper">
        {projects.map((item) => (
          <ProjectCard
            url={item.url}
            projectImage={item.image.url}
            projectTitle={item.title}
            description={item.description}
            technologies={item.techStack}
            id={item._id}
            key={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
