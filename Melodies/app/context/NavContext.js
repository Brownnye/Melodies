import React from "react";

const NavContext = React.createContext({
  activeTab: "home",
  setActiveTab: () => {},
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  bottomNavVisible: true,
  setBottomNavVisible: () => {},
});

export default NavContext;
