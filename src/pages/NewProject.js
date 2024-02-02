import React, { useState } from "react";
import { Container } from "../page/Container";
import { Button, Input, WindowContainer } from "../components/Generics";
import { useApi } from "../client/api";
import { useNavigate } from "react-router-dom";
import { useUserProjects } from "../hooks/useUserProjects";

export const NewProject = () => {
  const [name, setName] = useState("");
  const { projects, setProjects } = useUserProjects();
  const api = useApi();

  const navigate = useNavigate();
  const createProject = async () => {
    const p = await api.post("/projects", { name });
    setProjects([...projects, p.project]);
    navigate("/");
  };

  return (
    <Container>
      <WindowContainer className="w-1/3 mx-auto p-4 mt-10 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">New project</h1>
        <NewProjectForm setName={setName} />
        <Button onClick={createProject}>Create</Button>
      </WindowContainer>
    </Container>
  );
};

const NewProjectForm = ({ setName }) => {
  return (
    <div className="flex flex-col gap-4 my-6">
      <NewProjectFormSection
        title="Name"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

const NewProjectFormSection = ({ title, onChange }) => {
  return (
    <div className="flex gap-4 items-end">
      <Input onChange={onChange} placeholder="Name" />
    </div>
  );
};
