import React from "react";
import { Container } from "../page/Container";
import { HeaderMenu, ProjectMenu } from "../components/ProjectMenu";
import { LoadingOrChildren } from "../components/Generics";
import { useProjectContext } from "../providers/ProjectProvider";

const items = [
  {
    name: "General",
    icon: "settings",
    path: "general",
  },
  {
    name: "Collections",
    icon: "collections_bookmark",
    path: "collections",
  },
  {
    name: "Endpoints",
    icon: "swipe_right_alt",
    path: "endpoints",
  },
  {
    name: "Code",
    icon: "code",
    path: "code",
  },
  {
    name: "API Doc",
    icon: "description",
    path: "api-doc",
  },
  {
    name: "Deployment",
    icon: "deployed_code",
    path: "deployment",
    disabled: true,
  },
  {
    name: "Database",
    icon: "database",
    path: "database",
    disabled: true,
  },

  {
    name: "Usage",
    icon: "query_stats",
    path: "usage",
    disabled: true,
  },
];

export const Project = ({ children }) => {
  const { project } = useProjectContext();
  return (
    <Container
      title={project ? project.name : "Project"}
      subtitle="Admin"
      icon="folder"
      headerType="static"
      headerChildren={<HeaderMenu items={items} />}
    >
      <div className="pt-20">
        <LoadingOrChildren loading={!project}>{children}</LoadingOrChildren>
      </div>
    </Container>
  );
};
