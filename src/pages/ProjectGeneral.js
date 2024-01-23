import React, { useContext, useEffect } from "react";
import ProjectContext from "../context/ProjectContext";

export const ProjectGeneral = () => {
  const { project } = useContext(ProjectContext);

  return <div>{project ? project.name : "Loading..."}</div>;
};
