import React from "react";
import { Container } from "../page/Container";
import { HeaderMenu } from "../components/ProjectMenu";
import { useSettings } from "../providers/SettingsProvider";
import { LoadingOrChildren } from "../components/Generics";

const items = [
  {
    name: "General",
    icon: "settings",
    path: "general",
  },
  {
    name: "Integrations",
    icon: "leak_add",
    path: "github-settings",
  },
  {
    name: "Domains",
    icon: "domain",
    path: "domains",
  },
  {
    name: "Code",
    icon: "code",
    path: "code",
  },
  {
    name: "Subscription",
    icon: "subscriptions",
    path: "subscription",
  },
  {
    name: "Billing",
    icon: "receipt",
    path: "billing",
  },
];
export const Settings = ({ children }) => {
  const { settings } = useSettings();
  return (
    <Container
      title="Settings"
      subtitle="Manage your account"
      icon="settings"
      headerType="static"
      headerChildren={<HeaderMenu items={items} />}
    >
      <div className="pt-20">
        <LoadingOrChildren loading={!settings}>{children}</LoadingOrChildren>
      </div>
    </Container>
  );
};
