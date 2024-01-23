import React from "react";
import { Container } from "../page/Container";
import { ProjectList } from "../components/ProjectList";
import { useUserProjects } from "../hooks/useUserProjects";

export const Home = () => {
  const { projects } = useUserProjects();

  return (
    <Container
      title="Home"
      subtitle="Select your node cook project"
      icon="home"
    >
      {projects && <ProjectList projects={projects} />}
    </Container>
  );
};
