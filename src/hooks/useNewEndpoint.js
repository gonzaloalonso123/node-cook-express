import React, { useEffect, useState } from "react";

export const useNewEndpoint = () => {
  const [collection, setCollection] = useState(null);
  const [method, setMethod] = useState("GET");
  const [filterBy, setFilterBy] = useState(false);
  const [filterByCustom, setFilterByCustom] = useState("none");
  const [requiresAuthentication, setRequiresAuthentication] = useState(false);
  const [requiresAuthorization, setRequiresAuthorization] = useState(false);
  const [authorizedBy, setAuthorizedBy] = useState("none");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const getEndpoint = () => {
    return {
      collection: collection.id,
      method,
      filterBy,
      filterByCustom,
      requiresAuthentication,
      requiresAuthorization,
      authorizedBy,
      url,
      name,
    };
  };

  useEffect(() => {
    if (!collection) return;
    setName(
      `${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()} ${
        filterBy == "all" ? "all" : ""
      }
         ${collection.name} ${
        filterBy == "custom"
          ? `by ${filterByCustom}`
          : filterBy == "id"
          ? "by Id"
          : ""
      }`
    );
    setUrl(
      `/${collection.name.toLowerCase()}${
        filterBy == "id"
          ? "/:id"
          : filterBy == "custom"
          ? `?getBy={${filterByCustom}}`
          : ""
      }`
    );
    console.log(collection);
  }, [collection, method, filterBy, filterByCustom]);

  return {
    collection,
    setCollection,
    method,
    setMethod,
    filterBy,
    setFilterBy,
    requiresAuthentication,
    setRequiresAuthentication,
    requiresAuthorization,
    setRequiresAuthorization,
    authorizedBy,
    setAuthorizedBy,
    getEndpoint,
    filterByCustom,
    setFilterByCustom,
  };
};
