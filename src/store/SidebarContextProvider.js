import React, { useState } from "react";
import sidebarContext from "./sidebar-context";

const SidebarContextProvider = (props) => {
  const [isOpened, setIsOpened] = useState(true);

  const openedChangeHandler = () => {
    setIsOpened(!isOpened);
  };
  const context = {
    isOpened,
    setOpened: openedChangeHandler,
  };

  return (
    <sidebarContext.Provider value={context}>
      {props.children}
    </sidebarContext.Provider>
  );
};

export default SidebarContextProvider;
