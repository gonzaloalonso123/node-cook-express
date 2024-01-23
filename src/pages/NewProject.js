import React from "react";
import { Container } from "../page/Container";
import { Input } from "../components/Generics";

export const NewProject = () => {
  return (
    <Container title="New Project" subtitle="Create a new project" icon="add">
      <NewProjectForm />
    </Container>
  );
};

const NewProjectForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <NewProjectFormSection title="Name" />
      <NewProjectFormSection title="Description" />
    </div>
  );
};

const NewProjectFormSection = ({ title, onChange }) => {
  return (
    <div className="rounded-md mt-6 flex gap-6">
      <h1 className="text-xl font-regular w-48">{title}</h1>
      <Input onChange={onChange} />
    </div>
  );
};
