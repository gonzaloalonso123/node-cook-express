export const initialEndpointBundle = (collection) => {
  return [
    {
      name: "Get all",
      method: "GET",
      url: `/`,
      collectionId: collection.id,
      filterBy: "all",
    },
    {
      name: "Get by id",
      method: "GET",
      url: `/:id`,
      collectionId: collection.id,
      filterBy: "id",
    },
    {
      name: "Create",
      method: "POST",
      url: `/`,
      collectionId: collection.id,
    },
    {
      name: "Update",
      method: "PATCH",
      url: `/:id`,
      collectionId: collection.id,
    },
    {
      name: "Delete",
      method: "DELETE",
      url: `/:id`,
      collectionId: collection.id,
    },
  ];
};
