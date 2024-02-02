import React, { useState } from "react";
import {
  Button,
  Input,
  UnstyledInput,
  WindowContainer,
} from "../components/Generics";
import { useSettings } from "../providers/SettingsProvider";
import GithubIcon from "../assets/images/github.png";
import { BoldIcon, Icon } from "../components/icons/Icon";

export const GithubSettings = () => {
  const { settings } = useSettings();
  const [linkAccount, setLinkAccount] = useState(false);
  return (
    <WindowContainer>
      <h1 className="text-2xl font-bold">Github Settings</h1>
      <p>Manage your Github account</p>
      {settings && <MyProfile profile={settings.GithubSettings} />}
    </WindowContainer>
  );
};

const MyProfile = ({ profile }) => {
  const [linkAccount, setLinkAccount] = useState(false);
  return (
    <div className="w-1/2">
      {profile ? (
        <Profile profile={profile} />
      ) : (
        <>
          <div className="flex justify-between px-2">
            {!linkAccount && (
              <button
                className="py-1 px-4 bg-white hover:bg-gray-100 flex gap-2 items-center rounded-md border border-gray-200 w-fit text-black"
                onClick={() => setLinkAccount(!linkAccount)}
              >
                <img src={GithubIcon} className="w-6 h-6" />
                Link your github profile
              </button>
            )}
          </div>
          {linkAccount && <AddProfile close={() => setLinkAccount(false)} />}
        </>
      )}
    </div>
  );
};

const Profile = ({ profile }) => {
  return (
    <div className="m-2 p-2 border border-gray-200 rounded">
      <div className="text-lg select-non">{profile.name}</div>
      <div className="text-sm">
        ******************{profile.access_token.slice(-16)}
      </div>
    </div>
  );
};

const AddProfile = ({ close }) => {
  return (
    <div className="shadow-md px-4 py-1 rounded-md border border-gray-100">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2">
          <img src={GithubIcon} className="w-6 h-6" />
          Link your github profile
        </h1>
        <Button onClick={close} className="h-fit">
          <BoldIcon>arrow_back</BoldIcon>
        </Button>
      </div>
      <NewProfileForm />
    </div>
  );
};

const NewProfileForm = () => {
  return (
    <div className="flex flex-col gap-2 my-8">
      <ProfileFormField label="Username" type="text" />
      <ProfileFormField label="Access token" type="password" />
      <div className="flex justify-end gap-4 mt-6">
        <Button secondary>Cancel</Button>
        <Button>Save</Button>
      </div>
      <div className="bg-nc-yellow rounded-md flex p-2 mt-6 items-center">
        <div className="p-6">
          <Icon>question_mark</Icon>
        </div>
        <p>
          Generate an access token to provide node cook with access permisions
          to modify the selected repositories.
        </p>
      </div>
    </div>
  );
};

const ProfileFormField = ({ label, type }) => (
  <div className="flex gap-4 w-full items-center">
    <label className="w-1/2">{label}</label>
    <UnstyledInput className="w-4/5" type={type} />
  </div>
);
