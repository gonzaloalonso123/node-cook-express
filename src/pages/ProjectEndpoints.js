import React, { useEffect, useState } from "react";
import { Button, Input, Modal, WindowContainer } from "../components/Generics";
import { BoldIcon, ColorIcon, Icon } from "../components/icons/Icon";
import { Select } from "../components/Select/Select";
import { useNewEndpoint } from "../hooks/useNewEndpoint";
import { useProjectContext } from "../providers/ProjectProvider";
import { Toast } from "../components/toast/Toast";
import { initialEndpointBundle } from "../content/initialEndpointBundle.js";

const methods = [
  { label: "GET", value: "GET", color: "bg-green-500" },
  { label: "POST", value: "POST", color: "bg-blue-500" },
  { label: "DELETE", value: "DELETE", color: "bg-red-500" },
  { label: "PATCH", value: "PATCH", color: "bg-purple-500" },
];

export const ProjectEndpoints = () => {
  const { project } = useProjectContext();

  return (
    <WindowContainer>
      <div className="flex flex-col">
        <div className="flex gap-6">
          <CollectionList collections={project.collections} />
          {project.collections.length > 0 && (
            <AddEndpoint openDefault={project.collections.length === 0} />
          )}
        </div>
        {project.collections.length === 0 && (
          <h1 className="mt-10">No collections available</h1>
        )}
      </div>
    </WindowContainer>
  );
};

const CollectionList = ({ collections }) => (
  <div className="w-1/2">
    <h1 className="text-2xl font-bold mb-4">Endpoints</h1>
    <div className="flex flex-col">
      {collections.map((collection) => (
        <EndpointCollection key={collection.id} collection={collection} />
      ))}
    </div>
  </div>
);

const EndpointCollection = ({ collection }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="m-2 p-2 flex flex-col border bg-gray-100 rounded-md cursor-pointer">
      <div
        className="flex justify-between w-full items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-lg font-bold">/{collection.name}</div>
        <ColorIcon
          color="black"
          className={`${
            expanded ? "rotate-180" : ""
          } transition-all transition-500 select-none`}
        >
          keyboard_arrow_down
        </ColorIcon>
      </div>
      {expanded && <EndpointCollectionItems collection={collection} />}
    </div>
  );
};

const EndpointCollectionItems = ({ collection }) => {
  const { addBundleOfEndpoints } = useProjectContext();

  const generateBasicCrud = async () => {
    addBundleOfEndpoints(collection.id, initialEndpointBundle(collection));
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {collection.endpoints.length > 0 ? (
        collection.endpoints.map((item) => (
          <EndpointItem key={item.id} item={item} />
        ))
      ) : (
        <div className="p-4 select-none bg-white rounded-md flex flex-col gap-4">
          No endpoints linked to this collection.
          <Button
            className="w-fit mx-auto"
            onClick={() => {
              generateBasicCrud();
            }}
          >
            <BoldIcon color="#fff">add</BoldIcon>Create default endpoints
          </Button>
        </div>
      )}
    </div>
  );
};

const EndpointItem = ({ item }) => {
  const { removeEndpoint } = useProjectContext();
  const { project } = useProjectContext();
  const [openEndpointOptions, setOpenEndpointOptions] = useState(false);
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-2 px-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{item.name}</div>
        <div
          className="rounded-full p-1 flex items-center justify-center hover:bg-gray-200 cursor-pointer relative"
          onClick={() => setOpenEndpointOptions(!openEndpointOptions)}
        >
          <Icon>more_vert</Icon>
          {openEndpointOptions && (
            <Modal
              close={() => setOpenEndpointOptions(false)}
              options={[
                {
                  title: "Delete",
                  action: () => removeEndpoint(item.collectionId, item.id),
                  icon: "delete",
                },
              ]}
              little
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`text-sm ${
            methods.filter((m) => m.value == item.method)[0].color
          } p-1 rounded-md text-white font-bold w-fit`}
        >
          {item.method}
        </div>

        <div className="text-sm bg-gray-400 p-1 rounded-md text-white font-bold w-fit">{item.url}</div>
      </div>
    </div>
  );
};

const AddEndpoint = ({ openDefault }) => {
  const [addEnabled, setAddEnabled] = useState(openDefault);
  return (
    <div className={`w-1/2`}>
      <div
        className={`flex w-full ${
          addEnabled ? "justify-between" : "justify-end"
        }`}
      >
        {addEnabled && (
          <h1 className="text-2xl font-bold mb-4">New endpoint</h1>
        )}
        <Button
          onClick={() => setAddEnabled(!addEnabled)}
          className="h-fit bg-nc-blue"
        >
          <BoldIcon color="#fff">{addEnabled ? "arrow_back" : "add"}</BoldIcon>
        </Button>
      </div>
      {addEnabled && <NewEndpointForm disable={() => setAddEnabled(false)} />}
    </div>
  );
};

const NewEndpointForm = ({ disable }) => {
  const { project, addEndpoint } = useProjectContext();
  const {
    setCollection,
    collection,
    method,
    setMethod,
    setAuthorizedBy,
    filterBy,
    setFilterBy,
    filterByCustom,
    setFilterByCustom,
    setRequiresAuthentication,
    setRequiresAuthorization,
    getEndpoint,
    checkEndpointExists,
  } = useNewEndpoint();

  useEffect(() => {
    setCollection(project.collections[0]);
  }, [project.collections]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkEndpointExists()) return;
    addEndpoint(collection.id, getEndpoint());
    disable();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border-gray-100 "
    >
      <FormSelectField
        label="Collection"
        onChange={(value) => setCollection(value)}
        options={project.collections.map((collection) => ({
          label: collection.name,
          value: collection,
        }))}
      />
      <FormSelectField
        label="Method"
        onChange={(value) => setMethod(value)}
        options={methods}
      />
      {method == "GET" && (
        <FormSelectField
          label="Filter by"
          onChange={(value) => setFilterBy(value)}
          options={[
            { label: "None (get all)", value: "none" },
            { label: "Id", value: "id" },
            { label: "Custom value", value: "custom" },
          ]}
        />
      )}
      {method == "GET" && filterBy == "custom" && (
        <FormInputField
          label="Custom filter"
          onChange={(e) => setFilterByCustom(e.target.value)}
        />
      )}
      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const FormSelectField = ({ label, options, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Select options={options} onChange={onChange} color="black" />
  </div>
);

const FormInputField = ({ label, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Input onChange={onChange} className="w-48" />
  </div>
);
