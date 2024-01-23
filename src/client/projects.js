import axios from "axios";

const mockProjects = [
  {
    id: 1,
    name: "Fire project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 2,
    name: "Earth project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Water project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Water project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Sky project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Rocket project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Card project",
    description: "This is the first project",
    owner: "1",
  },
  {
    id: 3,
    name: "Build project",
    description: "This is the first project",
    owner: "1",
  },
];

const mockProject = {
  id: 1,
  name: "Fire project",
  description: "This is the first project",
  owner: "1",
  status: "off",
  created: "2021-06-01",
  updated: "2021-06-01",
  collections: 10,
  endpoints: 10,
  node_version: "14.17.0",
};

export const getUserProjects = async () => {
  //   const { data } = await axios.get("/api/projects");
  return mockProjects;
};

export const getProjectById = async (projectId) => {
  //   const { data } = await axios.get(`/api/projects/${projectId}`);
  await sleep(1000);
  return mockProject;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
