import React from "react";
import { Container } from "../page/Container";
import { ProjectMenu } from "../components/ProjectMenu";
import { useProjectContext } from "../context/ProjectContext";

export const Project = ({ children }) => {
  const { project } = useProjectContext();
  return (
    <Container
      title={project ? project.name : "Project"}
      subtitle="Admin"
      icon="folder"
      headerType="static"
      headerChildren={<ProjectMenu />}
    >
      <div className="pt-20">{children}</div>
    </Container>
  );
};