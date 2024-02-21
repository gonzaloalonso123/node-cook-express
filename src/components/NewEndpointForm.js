import { useEffect } from "react";
import { useNewEndpoint } from "../hooks/useNewEndpoint";
import { useProjectContext } from "../providers/ProjectProvider";
import { Button, Input } from "./Generics";
import { Select } from "./Select/Select";
import { Icon } from "./icons/Icon";

const methods = [
    { label: "GET", value: "GET", color: "bg-green-500" },
    { label: "POST", value: "POST", color: "bg-blue-500" },
    { label: "DELETE", value: "DELETE", color: "bg-red-500" },
    { label: "PATCH", value: "PATCH", color: "bg-purple-500" },
  ];

export const NewEndpointForm = ({ disable }) => {
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
    requiresAuthentication,
    requiresAuthorization,
    checkEndpointExists,
    pushTo,
    setPushTo,
    removeFrom,
    setRemoveFrom,
  } = useNewEndpoint();

  useEffect(() => {
    setCollection(project.collections[0]);
  }, [project.collections]);

  useEffect(() => {
    console.log(collection);
  }, [collection]);

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
      {project.prefered_database === "firebase" && (
        <FormSelectField
          label="Requires authentication"
          onChange={(value) => setRequiresAuthentication(value)}
          options={[
            { label: "No", value: false },
            { label: "Yes", value: true },
          ]}
        />
      )}
      {project.prefered_database === "firebase" && (
        <FormSelectField
          label="Requires authorization"
          onChange={(value) => setRequiresAuthorization(value)}
          options={[
            { label: "No", value: false },
            { label: "Yes", value: true },
          ]}
        />
      )}
      {project.prefered_database === "firebase" && requiresAuthorization && (
        <FormSelectField
          label="Authorized by"
          onChange={(value) => setAuthorizedBy(value)}
          options={[
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
          ]}
        />
      )}
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
        <FormSelectField
          label="Custom filter"
          onChange={(value) => setFilterByCustom(value)}
          options={collection.fields
            .filter((c) => c.name != "id")
            .map((field) => ({
              label: field.name,
              value: field.name,
            }))}
        />
      )}
      {method == "POST" && project.prefered_database === "firebase" && (
        <FormSelectField
          label="Post to"
          onChange={(value) => setPushTo(value)}
          value={pushTo}
          options={[
            { label: "Collection", value: "collection" },
            ...collection.fields
              .filter((f) => f.type == "Array")
              .map((field) => ({
                label: (
                  <div className="flex items-center gap-2">
                    {collection.name} <Icon>keyboard_arrow_right</Icon>
                    {field.name}
                  </div>
                ),
                value: field.name,
              })),
          ]}
        />
      )}
      {method == "DELETE" && project.prefered_database === "firebase" && (
        <FormSelectField
          label="Remove from"
          onChange={(value) => setRemoveFrom(value)}
          value={removeFrom}
          options={[
            { label: "Collection", value: "collection" },
            ...collection.fields
              .filter((f) => f.type == "Array")
              .map((field) => ({
                label: (
                  <div className="flex items-center gap-2">
                    {collection.name} <Icon>keyboard_arrow_right</Icon>
                    {field.name}
                  </div>
                ),
                value: field.name,
              })),
          ]}
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
