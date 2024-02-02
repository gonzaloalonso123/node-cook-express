import React from "react";
import { ColorIcon, Icon } from "./icons/Icon";
import { Link } from "react-router-dom";
import { LoadingOrChildren } from "./Generics";

export const ProjectList = ({ projects }) => {
  return (
      <div className="grid grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <ProjectCard project={project} key={i} />
        ))}
        <NewProjectCard />
      </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/project/${project.id}/general`}
      className="w-full h-48 bg-nc-dark-green hover:bg-nc-green shadow-md border-nc-dark-green rounded-md flex items-center justify-center cursor-pointer"
    >
      <h1 className="text-3xl font-bold text-white">{project.name}</h1>
    </Link>
  );
};

const NewProjectCard = () => {
  return (
    <Link
      to="/new-project"
      className="w-full h-48 bg-nc-dark-orange hover:bg-nc-orange rounded-md flex items-center justify-center cursor-pointer"
    >
      <h1 className="text-6xl font-black text-white">+</h1>
    </Link>
  );
};
