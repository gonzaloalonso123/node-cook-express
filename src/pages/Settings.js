import React from "react";
import { Container } from "../page/Container";
import { HeaderMenu } from "../components/ProjectMenu";

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
  return (
    <Container
      title="Settings"
      subtitle="Manage your account"
      icon="settings"
      headerType="static"
      headerChildren={<HeaderMenu items={items} />}
    >
      <div className="pt-20">{children}</div>
    </Container>
  );
};
