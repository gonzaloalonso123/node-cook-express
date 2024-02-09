import React, { useState } from "react";
import { Button, Input, Modal, WindowContainer } from "../components/Generics";
import { BoldIcon, Icon } from "../components/icons/Icon";
import { useProjectContext } from "../providers/ProjectProvider";
import { Toast } from "../components/toast/Toast";

export const ProjectCollections = () => {
  const { project, collectionCreated, setCollectionCreated } =
    useProjectContext();
  return (
    <WindowContainer>
      <div className="flex gap-6 min-h-56">
        <MyCollections collections={project.collections} />
        <AddCollection openDefault={project.collections.length === 0} />
      </div>
      {collectionCreated && (
        <Toast
          text="Collection created successfully"
          icon="check"
          close={() => setCollectionCreated(false)}
        />
      )}
    </WindowContainer>
  );
};

const MyCollections = ({ collections }) => (
  <div className="w-1/2">
    <div className="flex w-full justify-between">
      <h1 className="text-2xl font-bold mb-4">My collections</h1>
    </div>
    <div className="flex flex-col">
      {collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  </div>
);

const Collection = ({ collection }) => {
  const [openCollectionOptions, setOpenCollectionOptions] = useState(false);
  const { removeCollection } = useProjectContext();

  return (
    <div
      key={collection.id}
      className="m-2 border border-gray-200 rounded shadow-md"
    >
      <div className="select-none p-2 bg-gray-200 rounded-t-md flex items-center justify-between">
        <h1 className="font-bold text-lbg">{collection.name}</h1>
        <div
          className="rounded-full p-1 flex items-center justify-center hover:bg-gray-200 cursor-pointer relative"
          onClick={() => setOpenCollectionOptions(!openCollectionOptions)}
        >
          <Icon>more_vert</Icon>
          {openCollectionOptions && (
            <Modal
              close={() => setOpenCollectionOptions(false)}
              options={[
                {
                  title: "Delete",
                  action: () => removeCollection(collection.id),
                  icon: "delete",
                },
              ]}
              little
            />
          )}
        </div>
      </div>
      <div className="text-sm p-2">{collection.description}</div>
    </div>
  );
};

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
          <BoldIcon color="#fff">{addEnabled ? "arrow_back" : "add"}</BoldIcon>
        </Button>
      </div>
      {addEnabled && <NewCollectionForm disable={() => setAddEnabled(false)} />}
    </div>
  );
};

const NewCollectionForm = ({ disable }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addCollection, project } = useProjectContext();
  const [collectionExists, setCollectionExists] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkCollectionExists()) return;
    addCollection({ name, description });
    disable();
  };

  const checkCollectionExists = () => {
    if (project.collections.find((c) => c.name === name)) {
      setCollectionExists(true);
      return true;
    }
    return false;
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
      <div className="flex justify-end">
        <Button type="submit" className="w-fits">
          Add
        </Button>
      </div>
      {collectionExists && (
        <Toast
          text="Collection already exists"
          icon="error"
          error
          close={() => setCollectionExists(false)}
        />
      )}
    </form>
  );
};

const NewCollectionField = ({ label, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Input onChange={onChange} className="w-full" />
  </div>
);
