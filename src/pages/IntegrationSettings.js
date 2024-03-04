import React, { useEffect, useState } from "react";
import {
  Button,
  DangerButton,
  Input,
  Popup,
  UnstyledInput,
  WindowContainer,
} from "../components/Generics";
import { useSettings } from "../providers/SettingsProvider";
import GithubIcon from "../assets/images/github.png";
import { BoldIcon, Icon } from "../components/icons/Icon";
import { CopyableCodeSnippet } from "./ProjectCode";

export const IntegrationSettings = () => (
  <WindowContainer>
    <div className="flex flex-col gap-10">
      <GithubSettings />
      <FirebaseSettings />
    </div>
  </WindowContainer>
);

const GithubSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Github Settings</h1>
      <p>Manage your Github account</p>
      <MyProfile />
    </div>
  );
};

const FirebaseSettings = () => {
  return (
    <div className="flex flex-col gap-4 w-1/2">
      <h1 className="text-2xl font-bold">Firebase Settings</h1>
      <p>Manage your Firebase projects</p>
      <FirebaseProjectSettings />
    </div>
  );
};

const FirebaseProjectSettings = () => {
  const { settings, updateSettings } = useSettings();
  const [showAddProject, setShowAddProject] = useState(false);
  useEffect(() => console.log(settings), []);
  return (
    <div className="flex flex-col gap-4">
      {settings.firebase_profile.projects.map((project) => (
        <FirebaseProject project={project} />
      ))}
      <Button onClick={() => setShowAddProject(true)}>
        Add firebase project
      </Button>
      {showAddProject && (
        <AddFirebaseProject close={() => setShowAddProject(false)} />
      )}
    </div>
  );
};

const AddFirebaseProject = ({ close }) => {
  const { updateSettings, settings } = useSettings();
  const [name, setName] = useState("");
  const [config, setConfig] = useState("");
  const add = () => {
    const currentProjects = settings.firebase_profile.projects;
    const isServiceAcc = config.includes("type");
    currentProjects.push({
      name,
      config,
      service_account: isServiceAcc,
    });
    updateSettings("firebase_profile", {
      ...settings.firebase_profile,
      projects: currentProjects,
    });
    close();
  };
  return (
    <Popup close={close}>
      <div className="flex gap-4 max-w-2xl">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Add a new firebase project</h1>
            <div className="flex gap-4 w-full items-center">
              <label className="w-1/2">Name</label>
              <UnstyledInput
                className="w-4/5"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full items-center">
              <label className="w-1/2">Project config</label>
              <UnstyledInput
                className="w-4/5"
                onChange={(e) => setConfig(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button secondary onClick={close}>
              Cancel
            </Button>
            <Button create onClick={add}>
              Add
            </Button>
          </div>
        </div>
        <FirebaseProjectInfo />
      </div>
    </Popup>
  );
};

const FirebaseProjectInfo = () => {
  return (
    <div className="bg-nc-yellow rounded-md p-2 mt-6 gap-4 w-1/2">
      <p>Create a firebase project at </p>
      <CopyableCodeSnippet code=" https://console.firebase.google.com/" />

      <p>
        Once you have a new project, you can add it to node cook by pasting the
        service account configuration file here. You can get one at
      </p>
      <CopyableCodeSnippet code="https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk" />
    </div>
  );
};

const FirebaseProject = ({ project }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const { settings, updateSettings } = useSettings();

  const deleteProject = () => {
    const currentProjects = settings.firebase_profile.projects;
    const newProjects = currentProjects.filter((p) => p.name !== project.name);
    updateSettings("firebase_profile", {
      ...settings.firebase_profile,
      projects: newProjects,
    });
  };

  useEffect(() => {
    console.log(project.config);
    console.log(JSON.parse(project.config));
  }, []);
  return (
    <div className="p-2 border rounded-md flex flex-col">
      <div
        className="flex items-ceter justify-between cursor-pointer"
        onClick={() => setShowConfig(!showConfig)}
      >
        {project.name}
        <Icon>keyboard_arrow_down</Icon>
      </div>
      {showConfig && (
        <ProjectExtended
          setShowDeleteProject={setShowDeleteProject}
          deleteProject={deleteProject}
          showDeleteProject={showDeleteProject}
          project={project}
        />
      )}
    </div>
  );
};

const ProjectExtended = ({
  setShowDeleteProject,
  deleteProject,
  showDeleteProject,
  project,
}) => (
  <>
    <pre className="m-4 bg-gray-100 rounded-md p-2 justify-between overflow-scroll text-xs">
      {JSON.stringify(
        {
          ...JSON.parse(project.config),
          private_key: "hidden_key",
        },
        null,
        2
      )}
    </pre>
    <div className="flex justify-between p-4">
      {project.service_account ? (
        <p className="flex items-center gap-2">
          <Icon>key</Icon>Service account
        </p>
      ) : (
        <div />
      )}
      <DangerButton
        className="w-fitself-end"
        onClick={() => setShowDeleteProject(true)}
      >
        <Icon>delete</Icon>Delete project
      </DangerButton>
    </div>
    {showDeleteProject && (
      <DeletePopup
        close={() => setShowDeleteProject(false)}
        del={deleteProject}
        message="Are you sure you want to delete this project?"
      />
    )}
  </>
);

const MyProfile = () => {
  const [linkAccount, setLinkAccount] = useState(false);
  const { settings } = useSettings();
  return (
    <div className="w-1/2">
      {settings.github ? (
        <Profile />
      ) : (
        <>
          {!linkAccount && (
            <LinkProfileButton onClick={() => setLinkAccount(true)} />
          )}
          {linkAccount && <AddProfile close={() => setLinkAccount(false)} />}
        </>
      )}
    </div>
  );
};

const LinkProfileButton = ({ onClick }) => (
  <button
    className="py-1 px-4 bg-white hover:bg-gray-100 flex gap-2 items-center rounded-md border border-gray-200 w-fit text-black"
    onClick={onClick}
  >
    <img src={GithubIcon} className="w-6 h-6" />
    Link your github profile
  </button>
);

const Profile = () => {
  const { updateSettings, setSettings, settings } = useSettings();
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const deleteProfile = () => {
    updateSettings("github", null);
  };
  return (
    <div className="m-2 p-4 gap-4 flex flex-col border border-gray-200 rounded shadow-md">
      <div className="w-full justify-between flex">
        <div className="text-lg select-none flex items-center gap-2">
          <img src={GithubIcon} className="h-6 w-6" />
          {settings.github.username}
        </div>
        <DangerButton onClick={() => setShowDeleteProfile(true)}>
          <Icon>delete</Icon>Delete profile
        </DangerButton>
      </div>
      <Token profile={settings.github} />
      {showDeleteProfile && (
        <DeletePopup
          close={() => setShowDeleteProfile(false)}
          del={deleteProfile}
          message="Deleting your github profile will remove your access token from our
          system. Do you wish to continue?"
        />
      )}
    </div>
  );
};

const DeletePopup = ({ close, del, message }) => (
  <Popup close={close}>
    <div className="flex flex-col gap-4 max-w-96">
      <h1 className="font-bold">{message}</h1>
      <div className="flex w-full justify-between">
        <Button secondary onClick={close}>
          Cancel
        </Button>
        <DangerButton
          onClick={() => {
            del();
            close();
          }}
        >
          Delete
        </DangerButton>
      </div>
    </div>
  </Popup>
);

const Token = () => {
  const [edit, setEdit] = useState(false);
  const [editToken, setEditToken] = useState();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    if (settings.github) setEditToken(settings.github.access_token);
  }, [settings]);

  const saveUpdates = (token) => {
    updateSettings("github", { ...settings.github, access_token: token });
    setEdit(!edit);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <h1 className="flex items-center gap-2">
        <Icon className="h-6 w-6">key</Icon>Token
      </h1>
      <div className="p-1 border border-gray-100 justify-between flex items-center w-full rounded-md bg-gray-100">
        {edit ? (
          <UnstyledInput
            value={editToken}
            className="w-full"
            type="password"
            onChange={(e) => setEditToken(e.target.value)}
          />
        ) : (
          <HiddenToken token={settings.github.access_token} />
        )}
        <div className="flex gap-2 mx-2">
          <KeyEditButton
            edit={edit}
            onClick={() => {
              edit ? saveUpdates(editToken) : setEdit(!edit);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const HiddenToken = ({ token }) => (
  <div className="text-sm">******************{token.slice(-6)}</div>
);

const KeyEditButton = ({ onClick, edit }) => (
  <button
    className={`p-1 flex items-center justify-center ${
      edit ? "bg-nc-green" : "bg-nc-orange"
    } rounded-md hover:brightness-75 transform transition-all`}
    onClick={onClick}
  >
    <BoldIcon color="#fff" className="text-sm">
      {edit ? "save" : "edit"}
    </BoldIcon>
  </button>
);

const AddProfile = ({ close }) => {
  return (
    <div className="shadow-md px-4 py-1 rounded-md border border-gray-100">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2">
          <img src={GithubIcon} className="w-6 h-6" />
          Link your github profile
        </h1>
        <Button onClick={close} className="h-fit">
          <BoldIcon color="#fff">arrow_back</BoldIcon>
        </Button>
      </div>
      <NewProfileForm close={close} />
    </div>
  );
};

const NewProfileForm = ({ close }) => {
  const { updateSettings } = useSettings();
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const submit = () => {
    updateSettings("github", { username, access_token: accessToken });
    close();
  };

  return (
    <form className="flex flex-col gap-2 my-8" autoComplete="new-password">
      <ProfileFormField
        label="Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <ProfileFormField
        label="Access token"
        type="password"
        onChange={(e) => setAccessToken(e.target.value)}
      />
      <div className="flex justify-end gap-4 mt-6">
        <Button type="button" secondary>
          Cancel
        </Button>
        <Button onClick={submit}>Save</Button>
      </div>
      <GithubProfileInformation />
    </form>
  );
};

const GithubProfileInformation = () => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState(false);
  return (
    <div className="bg-nc-yellow rounded-md p-2 mt-6">
      <Info />
      <div
        className="cursor-pointer flex gap-3 w-fit mx-auto mt-6 items-center"
        onClick={() => setMoreInfoExpanded(!moreInfoExpanded)}
      >
        <Icon
          className={`
            ${moreInfoExpanded ? "transform rotate-180" : ""}
          `}
        >
          keyboard_arrow_down
        </Icon>
        <label className="underline text-sm cursor-pointer">
          More information
        </label>
      </div>
      {moreInfoExpanded && <MoreInfo />}
    </div>
  );
};

const Info = () => (
  <div className="flex flex-col">
    <div className="flex items-center">
      <div className="p-4">
        <Icon>question_mark</Icon>
      </div>
      <p className="p-2">
        Generate an access token to provide node cook with access permisions to
        modify the selected repositories.
      </p>
    </div>
  </div>
);

const MoreInfo = () => (
  <div className="p-2">
    <p>
      Node cook uses github to clone, inspect, modify, and push changes to your
      own repositories. To generate a new access token, go to your github
      settings, and then to the developer settings. Click on Personal access
      tokens and then Generate new token. Make sure to select the right
      permissions for the repositories you want to link.
    </p>
  </div>
);

const ProfileFormField = ({ label, type, onChange }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2" autocomplete="off">
      {label}
    </label>
    <UnstyledInput className="w-4/5" type={type} onChange={onChange} />
  </div>
);
