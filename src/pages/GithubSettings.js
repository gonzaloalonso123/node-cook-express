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

export const GithubSettings = () => (
  <WindowContainer>
    <h1 className="text-2xl font-bold">Github Settings</h1>
    <p>Manage your Github account</p>
    <MyProfile />
  </WindowContainer>
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
        <DeleteProfileButton onClick={() => setShowDeleteProfile(true)} />
      </div>
      <Token profile={settings.github} />
      {showDeleteProfile && (
        <DeleteProfilePopup
          close={() => setShowDeleteProfile(false)}
          deleteProfile={deleteProfile}
        />
      )}
    </div>
  );
};

const DeleteProfileButton = ({ onClick }) => (
  <button
    className="px-3 flex text-sm text-white justify-center bg-nc-red rounded-md hover:brightness-75 transform transition-all items-center gap-2"
    onClick={onClick}
  >
    <BoldIcon color="#fff" fontSize="15px">
      delete
    </BoldIcon>
    Delete profile
  </button>
);

const DeleteProfilePopup = ({ close, deleteProfile }) => (
  <Popup close={close}>
    <div className="flex flex-col gap-4 max-w-96">
      <h1 className="font-bold">
        Deleting your github profile will remove your access token from our
        system. Do you wish to continue?
      </h1>
      <div className="flex w-full justify-between">
        <Button secondary onClick={close}>
          Cancel
        </Button>
        <DangerButton
          onClick={() => {
            deleteProfile();
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
        <Button secondary>Cancel</Button>
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
