import React, { useEffect, useState } from "react";
import { useToast } from "../providers/ToastProvider";
import toasts from "../content/toasts.json";

export const useNewEndpoint = () => {
  const [collection, setCollection] = useState(null);
  const [method, setMethod] = useState("GET");
  const [filterBy, setFilterBy] = useState("all");
  const [filterByCustom, setFilterByCustom] = useState("none");
  const [requiresAuthentication, setRequiresAuthentication] = useState(false);
  const [requiresAuthorization, setRequiresAuthorization] = useState(false);
  const [authorizedBy, setAuthorizedBy] = useState("none");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const getEndpoint = () => {
    return {
      collection: collection.name,
      collectionId: collection.id,
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

  const checkEndpointExists = () => {
    if (
      collection.endpoints.filter((e) => e.url === url && e.method === method)
        .length > 0
    ) {
      showToast(toasts.endpoint_exists);
      return true;
    }
    return false;
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
          ? "by id"
          : ""
      }`
    );
    setUrl(
      `${
        filterBy == "id"
          ? "/:id"
          : filterBy == "custom"
          ? `/by${filterByCustom}/:value`
          : "/"
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
    checkEndpointExists,
  };
};
