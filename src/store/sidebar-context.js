import React from "react";

const sidebarContext = React.createContext({
  isOpened: true,
  setOpened: () => {},
});

export default sidebarContext;
