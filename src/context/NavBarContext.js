import React from "react";

export const NavBarContext = React.createContext();

export const useNavBarContext = () => {
  const context = React.useContext(NavBarContext);
  return context;
};

export const NavBarContextProvider = ({ children }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const value = {
    expanded,
    toggleExpanded,
  };

  return (
    <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>
  );
};
