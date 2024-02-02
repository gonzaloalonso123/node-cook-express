import React, { useState } from "react";
import { Button, Input, WindowContainer } from "../components/Generics";
import { BoldIcon, Icon } from "../components/icons/Icon";
import { useProjectContext } from "../providers/ProjectProvider";

export const ProjectCollections = () => {
  const { project } = useProjectContext();
  return (
    <WindowContainer>
      <div className="flex gap-6 min-h-56">
        <MyCollections collections={project.collections} />
        <AddCollection openDefault={project.collections.length === 0} />
      </div>
    </WindowContainer>
  );
};

const MyCollections = ({ collections }) => (
  <div className="w-1/2">
    <div className="flex w-full justify-between">
      <h1 className="text-2xl font-bold mb-4">My collections</h1>
    </div>
    <div className="grid grid-cols-3">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="m-2 border border-gray-200 rounded shadow-md"
        >
          <div className="text-lg select-non p-2 bg-gray-200 font-bold rounded-t-md">
            {collection.name}
          </div>
          <div className="text-sm p-2">{collection.description}</div>
        </div>
      ))}
    </div>
  </div>
);

const AddCollection = ({ openDefault }) => {
  const [addEnabled, setAddEnabled] = useState(openDefault);
  return (
    <div className="w-1/2">
      <div
        className={`flex w-full ${
          addEnabled ? "justify-between" : "justify-end"
        }`}
      >
        {addEnabled && (
          <h1 className="text-2xl font-bold mb-4">New collection</h1>
        )}
        <Button onClick={() => setAddEnabled(!addEnabled)} className="h-fit">
          <BoldIcon>{addEnabled ? "arrow_back" : "add"}</BoldIcon>
        </Button>
      </div>
      {addEnabled && <NewCollectionForm disable={() => setAddEnabled(false)} />}
    </div>
  );
};

const NewCollectionForm = ({ disable }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addCollection } = useProjectContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCollection({ name, description });
    disable();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <NewCollectionField
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <NewCollectionField
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

const NewCollectionField = ({ label, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Input onChange={onChange} className="w-full" />
  </div>
);
