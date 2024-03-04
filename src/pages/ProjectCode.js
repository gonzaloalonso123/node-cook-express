import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Modal, WindowContainer } from "../components/Generics";
import ProjectContext, {
  useProjectContext,
} from "../providers/ProjectProvider";
import github_icon from "../assets/images/github.png";
import { BoldIcon, ColorIcon, Icon } from "../components/icons/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useGithub } from "../hooks/useGithub";
import { useSettings } from "../providers/SettingsProvider";
import { Toast } from "../components/toast/Toast";
import { Select } from "../components/Select/Select";

export const ProjectCode = () => (
  <WindowContainer className="flex flex-row">
    <div className="flex flex-col">
      <div className="flex gap-6">
        <GithubIntegration />
        <GithubCodeInformation />
      </div>
    </div>
  </WindowContainer>
);

const GithubIntegration = () => {
  const { project } = useProjectContext();
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold mb-4">Code</h1>
        <div className="w-1/4">
          <Select
            fit
            options={[
              { label: "api", value: "api" },
              { label: "client", value: "client" },
            ]}
          />
        </div>
      </div>
      <p>Generate code and push it to your github repository</p>
      {project.github.enabled ? <GithubRepository /> : <AddRepository />}
    </div>
  );
};

const AddRepository = () => {
  const [addEnabled, setAddEnabled] = useState(false);
  return (
    <>
      {!addEnabled ? (
        <AddRepositoryButton onClick={() => setAddEnabled(true)} />
      ) : (
        <NewRepository close={() => setAddEnabled(false)} />
      )}
    </>
  );
};

const AddRepositoryButton = ({ onClick }) => (
  <button
    className="py-1 px-4 bg-white hover:bg-gray-100 flex gap-2 items-center rounded-md border border-gray-200 w-fit text-black"
    onClick={onClick}
  >
    <img src={github_icon} className="w-6 h-6" />
    Add repository
  </button>
);

const NewRepository = ({ close }) => {
  const { settings } = useSettings();
  return (
    <div className="flex flex-col gap-4 p-2 border border-gray-100 rounded-md shadow-md">
      <div className="flex justify-between px-2">
        <div className="flex flex-row gap-2">
          <img src={github_icon} className="w-6 h-6" />
          <h1>Add repository</h1>
        </div>
        <Button onClick={close} className="h-fit">
          <BoldIcon color="#fff">arrow_back</BoldIcon>
        </Button>
      </div>
      {settings.github ? <LinkRepository /> : <LinkToGithubSettings />}
    </div>
  );
};

const LinkRepository = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [cloneFailed, setCloneFailed] = useState(false);
  const [repositoryName, setRepositoryName] = useState("");
  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex gap-4 w-full items-center">
        <label className="w-1/2">User profile</label>
        <div className="flex items-center justify-between w-full">
          <h1>{settings.github.username}</h1>
          <button
            className={`p-1 flex items-center justify-center bg-white rounded-md border-transparent border-2 hover:border-nc-orange transform transition-all`}
            onClick={() => navigate("/settings/integration-settings")}
          >
            <BoldIcon color="#FFBB64" className="text-sm">
              edit
            </BoldIcon>
          </button>
        </div>
      </div>
      <GithubURLField
        onChange={(e) => {
          setRepositoryName(e.target.value);
        }}
      />
      <LinkRepositoryButton
        repositoryName={repositoryName}
        setCloneFailed={setCloneFailed}
      />
      {cloneFailed && <CloneFailed />}
    </div>
  );
};

const LinkRepositoryButton = ({ repositoryName, setCloneFailed }) => {
  const { linkRepository } = useProjectContext();
  const clone = async () => {
    const status = await linkRepository(repositoryName);
    if (status === 404) setCloneFailed(true);
  };
  return (
    <div className="flex justify-end gap-4">
      <Button onClick={clone}>
        <ColorIcon color="#fff">sync_alt</ColorIcon>Link repo
      </Button>
    </div>
  );
};

const LinkToGithubSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 py-4 border border-gray-100 m-4 rounded-md p-2 shadow-md">
      <p>Link your github profile to continue</p>
      <Button
        className="flex gap-6 w-fit"
        onClick={() => navigate("/settings/integration-settings")}
      >
        <ColorIcon color="#fff">settings</ColorIcon>My profiles
      </Button>
    </div>
  );
};

const GithubURLField = ({ value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {}, [currentValue]);
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
    </div>
  );
};

const CloneFailed = () => {
  return (
    <div className="bg-gray-100 rounded-md">
      <div className="flex items-center gap-2 p-2 justify-between">
        <Icon fontSize="24px" color="#F44336">
          error
        </Icon>
        <p className="text-nc-red">Not found</p>
        <div className="bg-white p-2 rounded-md flex flex-col gap-2">
          <h1>Do you have the right permissions?</h1>
          <p className="text-xs">
            Check that your repository exists and that your access_tokens has
            the right permissions
          </p>
          <Button>Generate</Button>
        </div>
      </div>
    </div>
  );
};

const GithubRepository = () => {
  const { project } = useProjectContext();
  const { cloneRepository, loading } = useGithub();
  const [codeSettings, setCodeSettings] = useState({
    indentation: "2",
    language: "javascript",
    database: project.prefered_database || "mongodb",
    port: project.port || "6999",
    framework: "express",
    wipe: false,
  });
  return (
    <div className="shadow-md rounded-md">
      <div className="p-2 flex flex-col">
        <GithubRepositoryHeader />
        <GithubRepositoryOptions
          setCodeSettings={setCodeSettings}
          codeSettings={codeSettings}
        />
        <GithubRepositoryButton
          onClick={() => cloneRepository(project.id, codeSettings)}
          loading={loading}
        />
      </div>
    </div>
  );
};

const GithubRepositoryHeader = () => {
  const { project, removeRepository } = useProjectContext();
  const [openRepositoryOptions, setOpenRepositoryOptions] = useState(false);

  return (
    <div className="justify-between flex border-b border-gray-200 p-2 bg-gray-100 rounded-md">
      <div className="flex gap-2">
        <img src={github_icon} className="w-6 h-6" />
        <h1 className="text-xl font-bold">{project.github.repository_name}</h1>
      </div>
      <div
        className="rounded-full p-1 flex items-center justify-center hover:bg-gray-200 cursor-pointer relative"
        onClick={() => setOpenRepositoryOptions(!openRepositoryOptions)}
      >
        <Icon>more_vert</Icon>
        {openRepositoryOptions && (
          <Modal
            close={() => setOpenRepositoryOptions(false)}
            options={[
              { title: "Delete", action: removeRepository, icon: "delete" },
            ]}
            little
          />
        )}
      </div>
    </div>
  );
};

const GithubRepositoryOptions = ({ setCodeSettings, codeSettings }) => {
  const { project } = useProjectContext();
  const { settings } = useSettings();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 p-2">
      <Option title="Branch" value={project.github.branch} />
      <OptionSelect
        title="Language"
        onChange={(value) => {
          setCodeSettings({ ...codeSettings, language: value });
        }}
        options={[
          { label: "javascript", value: "javascript" },
          { label: "typescript", value: "typescript" },
        ]}
      />
      <OptionSelect
        title="Framework"
        onChange={(value) => {
          setCodeSettings({ ...codeSettings, framework: value });
        }}
        options={[{ label: "express", value: "express" }]}
      />
      <OptionSelect
        title="Database"
        onChange={(value) => {
          setCodeSettings({ ...codeSettings, database: value });
        }}
        options={[
          { label: "MongoDB", value: "mongodb" },
          { label: "Firebase", value: "firebase" },
        ]}
        value={codeSettings.database}
      />
      {codeSettings.database === "firebase" &&
        settings.firebase_profile.projects.length != 0 && (
          <OptionSelect
            title="Select your firebase project"
            options={settings.firebase_profile.projects.map((project) => ({
              label: project.name,
              value: project.config,
            }))}
          />
        )}
      {codeSettings.database == "firebase" && (
        <Button
          className="w-1/2 self-end my-3"
          onClick={() => navigate("/settings/integration-settings")}
        >
          <Icon>add</Icon>
          Add firebase project
        </Button>
      )}
      <OptionSelect
        title="Indentation"
        onChange={(value) => {
          setCodeSettings({ ...codeSettings, indentation: value });
        }}
        options={[
          { label: "2 spaces", value: 2 },
          { label: "4 spaces", value: 4 },
        ]}
      />
      {codeSettings.database == "mongodb" && (
        <Option
          title="Port"
          onChange={(e) => {
            setCodeSettings({ ...codeSettings, port: e.target.value });
          }}
          value={codeSettings.port}
        />
      )}
      <OptionSelect
        title="Wipe previous repository data"
        onChange={(value) => {
          setCodeSettings({ ...codeSettings, wipe: value });
        }}
        options={[
          { label: "No", value: false },
          { label: "Yes", value: true },
        ]}
      />
    </div>
  );
};

const Option = ({ title, value, onChange }) => (
  <div className="flex justify-between py-2 items-center">
    <h1 className="font-regular w-1/2">{title}</h1>
    <Input onChange={onChange} value={value} />
  </div>
);

const OptionSelect = ({ title, value, options, onChange }) => (
  <div className="flex justify-between py-2 items-center">
    <h1 className="font-regular w-1/2">{title}</h1>
    <Select value={value} options={options} onChange={onChange} />
  </div>
);

const GithubRepositoryButton = ({ onClick, children, loading }) => (
  <button
    disabled={loading}
    className="p-2 bg-nc-green text-white mt-4 rounded-md shadow-md hover:font-regular hover:brightness-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-between gap-2"
    onClick={onClick}
  >
    <div className="flex gap-2 items-center">
      <Icon>publish</Icon>
      <h1 className="font-bold">{loading ? "Cooking" : "Cook"} backend</h1>
    </div>
    {loading ? (
      <Icon className="animate-spin" fontSize="24px">
        sync
      </Icon>
    ) : (
      <div style={{ height: "24px" }}></div>
    )}
  </button>
);

const GithubCodeInformation = () => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState(false);
  const { settings } = useSettings();
  const { project } = useProjectContext();
  return (
    <div className="flex flex-col w-1/2">
      <h1 className="text-2xl font-bold mb-4">Usage</h1>
      <div className="bg-nc-yellow rounded-md p-2 mt-6 h-fit">
        {project.prefered_database === "mongodb" ? (
          <InfoMongo />
        ) : (
          <RunMyDbFirebase />
        )}
        {project.prefered_database === "mongodb" && (
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
              How to run my backend?
            </label>
          </div>
        )}
        {moreInfoExpanded && <RunMyDbMongo />}
      </div>
    </div>
  );
};

const InfoMongo = () => (
  <div className="flex flex-col">
    <div className="flex items-center">
      <div className="p-4">
        <Icon>question_mark</Icon>
      </div>
      <p className="p-2">
        Ready to deploy your changes? Submit your updates to upload a fresh
        backend to your repository. Your package includes an Express server, a
        database connection, and a set of pre-configured endpoints to jumpstart
        your project.
      </p>
    </div>
  </div>
);

const RunMyDbMongo = () => {
  const { project } = useProjectContext();
  const { settings } = useSettings();
  const repository_name = project.github
    ? project.github.repository_name
    : "your-repo";
  const user_name = settings.github
    ? settings.github.username
    : "your-username";
  const projectUrl = `https://github.com/${user_name}/${repository_name}`;
  return (
    <div className="p-2">
      <p className="py-4">
        <h1 className="font-bold">
          1. Clone Your Repository to Your Local Machine:
        </h1>
        <CopyableCodeSnippet code={`git clone ${projectUrl}`} />
        <h1 className="font-bold">2. navigate to the root of your directory</h1>
        <CopyableCodeSnippet code={`cd ${repository_name}`} />
        <h1 className="font-bold">3. Run the docker:</h1>
        Additionally, your repository includes a Dockerfile and a docker-compose
        file for containerized deployment. <br /> Ensure Docker is installed and
        execute the following command in your repository's root:
        <CopyableCodeSnippet code="docker-compose up" />
        Explore deployment options in the{" "}
        <Link to="deployment">Deployment</Link> tab.
      </p>
    </div>
  );
};

export const CopyableCodeSnippet = ({ code }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-2 items-center">
        <Input value={code} readOnly className="w-full" />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
          }}
        >
          {copied ? (
            <ColorIcon color="white">check</ColorIcon>
          ) : (
            <ColorIcon color="white">content_copy</ColorIcon>
          )}
        </Button>
      </div>
    </div>
  );
};

const InfoFirebase = () => (
  <div className="flex flex-col">
    <div className="flex items-center">
      <div className="p-4">
        <Icon>question_mark</Icon>
      </div>
      <p className="p-2">
        Ready to deploy your changes? Submit your updates to upload a fresh
        backend to your repository. Your package includes an Express server, a
        database connection, and a set of pre-configured endpoints to jumpstart
        your project.
      </p>
    </div>
  </div>
);

const RunMyDbFirebase = () => {
  const { project } = useProjectContext();
  const { settings } = useSettings();
  const repository_name = project.github
    ? project.github.repository_name
    : "your-repo";
  const user_name = settings.github
    ? settings.github.username
    : "your-username";
  const projectUrl = `https://github.com/${user_name}/${repository_name}`;
  return (
    <div className="p-2">
      <p className="py-4">
        <h1 className="font-bold text-xl my-2">Set up firebase API</h1>
        Lets get your API up and running. First you need to have a working
        project in firebase and have enabled the following services:
        <ul className="my-4">
          <li className="flex gap-4 items center">
            <Icon>check</Icon>Firestore Database
          </li>
          <li className="flex gap-4 items center">
            <Icon>check</Icon>Functions
          </li>
          <li className="flex gap-4 items center">
            <Icon>check</Icon>Authentication
          </li>
        </ul>
        <h1 className="font-bold bg-gray-100 p-2 my-2">
          Before you begin cooking with nodecook, this is the recommended setup:
        </h1>
        <h1 className="font-bold">
          1. Create an empty github repository and clone it into your local
          machine:
        </h1>
        <CopyableCodeSnippet code={`git clone ${projectUrl}`} />
        <h1 className="font-bold">2. Navigate to the root of your directory</h1>
        <CopyableCodeSnippet code={`cd ${repository_name}`} />
        <h1 className="font-bold">
          3. Type the following commands in the terminal
        </h1>
        <CopyableCodeSnippet code="firebase login" />
        Log into your google account through the browser
        <CopyableCodeSnippet code="firebase init" />
        <h1 className="font-bold my-1">
          4. Select your project, and enable functions
        </h1>
        <h1 className="font-bold my-1">5. Push your repository</h1>
        <h1 className="font-bold gap-2 flex items-center my-1">
          6. Press{" "}
          <div className="bg-nc-green p-1 rounded-md w-fit h-fit text-white whitespace-nowrap font-sm">
            Cook backend
          </div>{" "}
          button to generate your API
        </h1>
        <h1 className="font-bold my-1">
          7. Clone Your Repository to Your Local Machine:
        </h1>
        <CopyableCodeSnippet code={`git clone ${projectUrl}`} />
        <h1 className="font-bold">8. navigate to the root of your directory</h1>
        <CopyableCodeSnippet code={`cd ${repository_name}`} />
        <h1 className="font-bold">
          9. Create a folder named .firebase and copy your admin configuration
          into a file named service_account.json:
        </h1>
        <CopyableCodeSnippet
          code={`mkdir .firebase && touch .firebase/service_account.json`}
        />
        Find your admin configuration at
        <CopyableCodeSnippet code="https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk" />
        <h1 className="font-bold">10. Add this snippet to your .env file:</h1>
        <CopyableCodeSnippet code="GOOGLE_APPLICATION_CREDENTIALS=.firebase/service_account.json" />
        Explore deployment options in the{" "}
        <Link to="deployment">Deployment</Link> tab.
      </p>
    </div>
  );
};
