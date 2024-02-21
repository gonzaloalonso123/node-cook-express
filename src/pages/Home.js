import React from "react";
import { Container } from "../page/Container";
import { ProjectList } from "../components/ProjectList";
import { useUserProjects } from "../hooks/useUserProjects";
import { LoadingOrChildren } from "../components/Generics";

export const Home = () => {
  const { projects } = useUserProjects();

  return (
    <Container
      title="Home"
      subtitle="Select your node cook project"
      icon="home"
      className="bg-white"
    >
      <LoadingOrChildren loading={!projects}>
        <ProjectList projects={projects} />
      </LoadingOrChildren>
    </Container>
  );
};
