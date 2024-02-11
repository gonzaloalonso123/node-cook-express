import React, { useEffect, useState } from "react";
import {
  Button,
  DangerButton,
  Input,
  Modal,
  WindowContainer,
} from "../components/Generics";
import { BoldIcon, ColorIcon, Icon } from "../components/icons/Icon";
import { useProjectContext } from "../providers/ProjectProvider";
import toasts from "../content/toasts.json";
import { useToast } from "../providers/ToastProvider";
import { Select } from "../components/Select/Select";
import { v4 as uuidv4 } from "uuid";

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
      <h1 className="text-2xl font-bold mb-4">Collections</h1>
    </div>
    <div className="flex flex-col">
      {collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  </div>
);

const Collection = ({ collection }) => {
  const [edit, setEdit] = useState(false);
  const { removeCollection, updateCollection } = useProjectContext();
  const [expanded, setExpanded] = useState(false);
  const [fields, setFields] = useState(collection.fields);
  const { showToast } = useToast();
  const saveSchema = () => {
    if (fields.find((f) => f.name === "")) {
      showToast(toasts.empty_field);
      return;
    }
    updateCollection({
      ...collection,
      fields: fields,
    });
    setEdit(false);
  };

  return (
    <div className="m-2 p-2 flex flex-col border bg-gray-100 rounded-md cursor-pointer">
      <div
        className="flex justify-between w-full items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-lg font-bold">{collection.name}</div>
        <div className="flex gap-4 items-center">
          <ColorIcon
            color="black"
            className={`${
              expanded ? "rotate-180" : ""
            } transition-all transition-500 select-none`}
          >
            keyboard_arrow_down
          </ColorIcon>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col p-4 bg-white mt-2">
          <CollectionOptionsHeader
            collection={collection}
            setEdit={setEdit}
            removeCollection={removeCollection}
            edit={edit}
            saveSchema={saveSchema}
          />
          <SchemaForm fields={fields} edit={edit} setFields={setFields} />
        </div>
      )}
    </div>
  );
};

const CollectionOptionsHeader = ({
  collection,
  setEdit,
  removeCollection,
  edit,
  saveSchema,
}) => (
  <div className="flex gap-2 items-center pb-3 justify-end">
    {edit ? (
      <>
        <Button create onClick={() => saveSchema(collection.id)}>
          <Icon>save</Icon>
        </Button>
        <Button onClick={() => setEdit(false)}>
          <Icon>keyboard_arrow_left</Icon>
        </Button>
      </>
    ) : (
      <>
        <DangerButton onClick={() => removeCollection(collection.id)}>
          <Icon>delete</Icon>
        </DangerButton>
        <Button onClick={() => setEdit(true)}>
          <Icon>edit</Icon>
        </Button>
      </>
    )}
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
  const [fields, setFields] = useState([{ name: "id", type: "UUID" }]);
  const { addCollection, project } = useProjectContext();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkSubmission()) return;
    if (checkCollectionExists()) return;
    addCollection({ name, description, fields });
    disable();
  };

  const checkCollectionExists = () => {
    if (project.collections.find((c) => c.name === name)) {
      showToast(toasts.collection_exists);
      return true;
    }
    return false;
  };

  const checkSubmission = () => {
    if (name.includes(" ")) {
      showToast(toasts.no_spaces);
      return true;
    }
    if (fields.find((f) => f.name === "")) {
      showToast(toasts.empty_field);
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
      <SchemaForm setFields={setFields} fields={fields} edit={true} />
      <div className="flex justify-end">
        <Button type="submit" className="w-fits" create>
          Create
        </Button>
      </div>
    </form>
  );
};

const SchemaForm = ({ setFields, fields, edit }) => {
  const addSchemaField = () => {
    setFields([...fields, { name: "", type: "String", id: uuidv4() }]);
  };

  const modifyField = (id, key, value) => {
    const newFields = fields.map((f) => {
      if (f.id === id) {
        return { ...f, [key]: value };
      }
      return f;
    });
    setFields(newFields);
  };

  const deleteField = (id) => {
    const newFields = fields.filter((f) => f.id !== id);
    setFields(newFields);
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-md shadow-md">
      {edit && <h1 className="font-bold text-xl">Define schema</h1>}
      <div className={`flex gap-10 ${edit ? "w-10/12" : ""}`}>
        <div className="flex-1 ml-2 text-gray-500">Name</div>
        <div className="flex-1 ml-2 text-gray-500">type</div>
      </div>
      <div className="flex flex-col gap-4">
        <IdField edit={edit} />
        {fields
          .filter((_, i) => i !== 0)
          .map((field) => (
            <div key={field.id} className="flex-1 mx-1">
              {edit ? (
                <SchemaField
                  field={field}
                  modifyField={(value, type) =>
                    modifyField(field.id, type, value)
                  }
                  removeField={() => deleteField(field.id)}
                />
              ) : (
                <div className="flex gap-4">
                  <div className="w-1/2 px-2">{field.name}</div>
                  <div className="w-1/2 px-2">{field.type}</div>
                </div>
              )}
            </div>
          ))}
      </div>
      {edit && (
        <Button onClick={addSchemaField} className="flex-1 mx-1" type="button">
          <Icon>add</Icon>Add new field
        </Button>
      )}
    </div>
  );
};

const SchemaField = ({ field, modifyField, removeField }) => (
  <div className="flex items-center justify-between w-full gap-4">
    <Input
      className="flex-1"
      value={field.name}
      onChange={(e) => modifyField(e.target.value, "name")}
    />
    <Select
      options={newSchemaOptions}
      value={field.type}
      fit
      onChange={(value) => modifyField(value, "type")}
    />
    <div className="justify-end w-fit">
      <DangerButton onClick={removeField} className=" h-fit w-fit px-1 ">
        <Icon>delete</Icon>
      </DangerButton>
    </div>
  </div>
);

const IdField = ({ edit }) => (
  <div className="flex gap-4 w-full">
    <Input className="flex-1" value="id" disabled />
    <Input value="UUID" className="flex-1" disabled />
    {edit && <div className="w-1/12"></div>}
  </div>
);

const newSchemaOptions = [
  { label: "String", value: "String" },
  { label: "Date", value: "Date" },
  { label: "Number", value: "Number" },
  { label: "Boolean", value: "Boolean" },
  { label: "Mixed", value: "Mixed" },
  { label: "ObjectId", value: "ObjectId" },
  { label: "Array", value: "Array" },
  { label: "Decimal128", value: "Decimal128" },
  { label: "Map", value: "Map" },
  { label: "Schema", value: "Schema" },
  { label: "UUID", value: "UUID" },
  { label: "BigInt", value: "BigInt" },
];

const NewCollectionField = ({ label, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Input onChange={onChange} className="w-full" />
  </div>
);
