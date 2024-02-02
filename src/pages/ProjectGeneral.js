import React, { useContext, useEffect, useState } from "react";
import { Button, Input, WindowContainer } from "../components/Generics";
import { useProjectContext } from "../providers/ProjectProvider";
import { useAuthentication } from "../providers/AuthenticationProvider";

export const ProjectGeneral = () => {
  const { project } = useProjectContext();
  return (
    <div className="flex gap-6">
      <WindowContainer className="w-full">
        <h1 className="text-2xl font-bold ">General</h1>
        <EditableForm project={project} />
      </WindowContainer>
      <WindowContainer className="w-full">
        <h1 className="text-2xl font-bold">Details</h1>
        <ProjectInfo project={project} />
      </WindowContainer>
    </div>
  );
};

const EditableForm = ({ project }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditable(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editable}
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!editable}
        />
      </div>
      <div className="flex justify-end gap-4">
        {editable ? (
          <>
            <Button type="button" secondary onClick={() => setEditable(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </>
        ) : (
          <Button onClick={() => setEditable(true)}>Edit</Button>
        )}
      </div>
    </form>
  );
};

const ProjectInfo = ({ project }) => {
  const { user } = useAuthentication();
  return (
    <div className="flex flex-col gap-4">
      <ProjectInfoField label="Name" value={project.name} />
      <ProjectInfoField label="Owner" value={user.email} />
      <ProjectInfoField label="Description" value={project.description} />
      <ProjectInfoStatus label="Status" value={project.status} />
      <ProjectInfoField label="Created" value={new Date(project.created).toLocaleString()} />
      <ProjectInfoField label="Last updated" value={new Date(project.updated).toLocaleString()} />
      <ProjectInfoField label="Collections" value={project.collections_count} />
      <ProjectInfoField label="Endpoints" value={project.endpoints_count} />
      <ProjectInfoField label="Node version" value={project.node_version} />
    </div>
  );
};

const ProjectInfoField = ({ label, value }) => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <h1 className="font-bold text-gray-600 w-1/2">{label}</h1>
      <p>{value}</p>
    </div>
  );
};

const ProjectInfoStatus = ({ label, value }) => {
  return (
    <div className="flex gap-2 w-full">
      <h1 className="font-bold w-1/2 text-gray-600">{label}</h1>
      <div
        className={`rounded-full ${
          value === "on" ? "bg-nc-green" : "bg-nc-red"
        } h-5 w-5 border border-black`}
      />
    </div>
  );
};
