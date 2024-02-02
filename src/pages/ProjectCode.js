import React, { useContext, useEffect, useState } from "react";
import { Button, Input, WindowContainer } from "../components/Generics";
import ProjectContext, {
  useProjectContext,
} from "../providers/ProjectProvider";
import github_icon from "../assets/images/github.png";
import { BoldIcon, ColorIcon, Icon } from "../components/icons/Icon";
import { useNavigate } from "react-router-dom";

export const ProjectCode = () => {
  const { project } = useContext(ProjectContext);

  return (
    <WindowContainer >
      <h1 className="text-2xl font-bold">Code</h1>
      <p>Generate code and push it to your github repository</p>
      <GithubIntegration project={project} />
    </WindowContainer>
  );
};

const GithubIntegration = ({ project }) => {
  return project.github.enabled ? (
    <GithubRepository project={project} />
  ) : (
    <AddRepository project={project} />
  );
};

const AddRepository = ({ project }) => {
  const [addEnabled, setAddEnabled] = useState(false);
  return (
    <>
      {!addEnabled ? (
        <button
          className="py-1 px-4 bg-white hover:bg-gray-100 flex gap-2 items-center rounded-md border border-gray-200 w-fit text-black"
          onClick={() => setAddEnabled(!addEnabled)}
        >
          <img src={github_icon} className="w-6 h-6" />
          Add repository
        </button>
      ) : (
        <NewRepository close={() => setAddEnabled(false)} />
      )}
    </>
  );
};

const NewRepository = ({ close }) => {
  const [isRepoPrivate, setIsRepoPrivate] = useState(false);
  const { project } = useProjectContext();
  const navigate = useNavigate();
  const [activeAccount, setActiveAccount] = useState(project.github.enabled);

  return (
    <div className="flex flex-col gap-4 w-1/2 p-2 border border-gray-100 rounded-md">
      <div className="flex justify-between px-2">
        <div className="flex flex-row gap-2">
          <img src={github_icon} className="w-6 h-6" />
          <h1>Add repository</h1>
        </div>
        <Button onClick={close} className="h-fit">
          <BoldIcon>arrow_back</BoldIcon>
        </Button>
      </div>
      {project.activeAccount ? (
        <>
          <div className="flex flex-col gap-2 py-4">
            <GithubURLField
              onChange={() => {}}
              openIsPrivate={() => setIsRepoPrivate(true)}
            />
            {isRepoPrivate && <RepoPrivate />}
          </div>
          <div className="flex justify-end gap-4">
            <Button secondary>Cancel</Button>
            <Button>Save</Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 py-4 border border-gray-100 m-4 rounded-md p-2 shadow-md">
          <p>Link your github profile to continue</p>
          <Button
            className="flex gap-6 w-fit"
            onClick={() => navigate("/settings/github-settings")}
          >
            <ColorIcon color="#fff">settings</ColorIcon>My profiles
          </Button>
        </div>
      )}
    </div>
  );
};

const NewRepositoryField = ({ label, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <Input onChange={onChange} className="w-4/5" />
  </div>
);

const GithubURLField = ({ value, onChange, openIsPrivate }) => {
  const [repoExists, setRepoExists] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (currentValue) checkRepo();
  }, [currentValue]);

  const checkRepo = async () => {};

  const handleStatus = (status) => {
    if (status === 200) setRepoExists(true);
    else if (status === 404) {
      setRepoExists(false);
      openIsPrivate();
    }
  };

  return (
    <div className="flex gap-4 w-full items-center">
      <label className="w-1/2">Repository URL</label>
      <Input
        value={value}
        className="w-full"
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
      />
      <div className="w-1/12">
        {currentValue && (
          <Icon fontSize="24px" color={repoExists ? "#4CAF50" : "#F44336"}>
            {repoExists ? "check_circle" : "error"}
          </Icon>
        )}
      </div>
    </div>
  );
};

const RepoPrivate = (url) => {
  return (
    <div className="bg-gray-100 rounded-md">
      <div className="flex items-center gap-2 p-2 justify-between">
        <Icon fontSize="24px" color="#F44336">
          error
        </Icon>
        <p className="text-nc-red">Not found</p>
        <div className="bg-white p-2 rounded-md flex flex-col gap-2">
          <h1>Is your repository private?</h1>
          <p className="text-xs">
            Generate a SSH key and add it to your Github account to access this
            repository
          </p>
          <Button>Generate</Button>
        </div>
      </div>
    </div>
  );
};

const GithubRepository = ({ project }) => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <label>Repository name</label>
        <Input value={project.github.repository} />
      </div>
      <div className="flex flex-col gap-2">
        <label>Branch</label>
        <Input value={project.github.branch} />
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <label>Username</label>
        <Input value={project.github.username} />
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <Input value={project.github.password} />
      </div>
    </div>
    <div className="flex justify-end gap-4">
      <Button secondary>Cancel</Button>
      <Button>Save</Button>
    </div>
  </div>
);
