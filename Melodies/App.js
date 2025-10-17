import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// Login and SignUp screens are available but we open homepage by default now
// import LoginScreen from "./app/screens/login/login";
// import SignUpScreen from "./app/screens/logout/logout";
// HomePage is available; switch to Discover for preview
// import HomePage from "./app/screens/home/HomePage";
import DiscoverPage from "./app/screens/discover/DiscoverPage";
import HomePage from "./app/screens/home/HomePage";
import { BottomNavigation } from "./app/shared/components/spec/Header/BackHeader";
import AlbumPage from "./app/screens/albums/AlbumPage";
import NavContext from "./app/context/NavContext";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const hideTimer = useRef(null);

  const showBottomNav = useCallback(() => {
    setBottomNavVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBottomNavVisible(false), 10000);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <NavContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedAlbum,
        setSelectedAlbum,
        bottomNavVisible,
        setBottomNavVisible,
        showBottomNav,
      }}
    >
      <View style={{ flex: 1 }}>
        {activeTab === "home" ? <HomePage /> : null}
        {activeTab === "discover" ? <DiscoverPage /> : null}
        {activeTab === "albums" ? <AlbumPage /> : null}

        {/* Bottom nav is positioned absolute inside BackHeader so we render it here
            and control its visibility. MiniPlayer will be rendered above it.
        */}
        {bottomNavVisible ? (
          <BottomNavigation
            active={activeTab}
            onTabChange={(t) => {
              setActiveTab(t);
              showBottomNav();
            }}
          />
        ) : null}
      </View>
    </NavContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255, 0, 255, 0.8)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000,
  },
  switchText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
