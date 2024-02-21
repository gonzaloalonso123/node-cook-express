import React, { useEffect, useState } from "react";
import { useToast } from "../providers/ToastProvider";
import toasts from "../content/toasts.json";
import { filter } from "lodash";

export const useNewEndpoint = () => {
  const [collection, setCollection] = useState(null);
  const [method, setMethod] = useState("GET");
  const [filterBy, setFilterBy] = useState("all");
  const [filterByCustom, setFilterByCustom] = useState("none");
  const [requiresAuthentication, setRequiresAuthentication] = useState(false);
  const [requiresAuthorization, setRequiresAuthorization] = useState(false);
  const [authorizedBy, setAuthorizedBy] = useState("none");
  const [pushTo, setPushTo] = useState("collection");
  const [removeFrom, setRemoveFrom] = useState("collection");
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
    let name = `${
      method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()
    }`;
    if (method == "GET") {
      name += filterBy == "all" ? " all" : "";
    }
    name += ` ${collection.name}`;
    if (method == "POST") {
      name += pushTo == "collection" ? "" : ` -> ${pushTo}`;
    }
    if (method == "DELETE") {
      name += removeFrom == "collection" ? "" : ` -> ${removeFrom}`;
    }
    if (method == "GET") {
      name += filterBy == "custom" ? ` by ${filterByCustom}` : "";
    }
    setName(name);
    let url = "";
    if (method == "GET") {
      if (filterBy == "id") {
        url = "/:id";
      } else if (filterBy == "custom") {
        url = `/by${filterByCustom}/:value`;
      } else {
        url = "/";
      }
    } else if (method == "POST") {
      url = pushTo != "collection" ? `/${pushTo}` : "/";
    } else if (method == "DELETE") {
      url = removeFrom != "collection" ? `/:id/${removeFrom}` : "/:id";
    } else if (method == "PATCH") {
      url = "/:id";
    }
    setUrl(url);
    console.log(collection);
  }, [collection, method, filterBy, filterByCustom, pushTo, removeFrom]);

  useEffect(() => {
    if (filterBy == "custom") {
      setFilterByCustom(collection.fields[1]?.name || "none");
    }
  }, [filterBy]);

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
    pushTo,
    setPushTo,
    removeFrom,
    setRemoveFrom,
  };
};
