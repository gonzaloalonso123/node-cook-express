import React, { useState } from "react";
import {
  Button,
  DangerButton,
  Input,
  WindowContainer,
} from "../components/Generics";
import { useProjectContext } from "../providers/ProjectProvider";
import { Select } from "../components/Select/Select";
import { Icon } from "../components/icons/Icon";
import { useToast } from "../providers/ToastProvider";
import toasts from "../content/toasts.json";

export const ProjectApiDoc = () => {
  const { project } = useProjectContext();
  return (
    <WindowContainer>
      <Document document={project.document} />
      <MyCollections collections={project.collections} />
    </WindowContainer>
  );
};

const Document = ({ document }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-black mb-6">API docs</h1>
      <p>Find the details of your API and examples in how to access it</p>
    </div>
  );
};

const MyCollections = ({ collections }) => (
  <div className="w-1/2">
    <div className="flex w-full justify-between">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
    </div>
    <div className="flex flex-col">
      {collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  </div>
);

const Collection = ({ collection }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="m-2 p-2 flex flex-col border bg-gray-100 rounded-md cursor-pointer">
      <div
        className="flex justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg font-bold">{collection.name}</h2>
        <div className="flex gap-2">
          <Icon icon={expanded ? "minus" : "plus"} />
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col gap-2">
          {collection.endpoints.map((endpoint) => (
            <Endpoint key={endpoint.id} endpoint={endpoint} />
          ))}
        </div>
      )}
    </div>
  );
};

const Endpoint = ({ endpoint, collection }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="m-2 p-2 flex flex-col border bg-gray-100 rounded-md cursor-pointer">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{endpoint.name}</h3>
        <div className="flex gap-2">
          <Icon
            onClick={() => setExpanded(!expanded)}
            icon={expanded ? "minus" : "plus"}
          />
        </div>
      </div>
      {expanded && <div className="flex flex-col gap-2"></div>}
    </div>
  );
};

const Field = ({ field }) => {
  return (
    <div className="m-2 p-2 flex flex-col border bg-gray-100 rounded-md cursor-pointer">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">{field.name}</h4>
        <h4 className="text-lg font-bold">{field.type}</h4>
      </div>
    </div>
  );
};

export default MyCollections;
