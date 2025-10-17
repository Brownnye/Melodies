import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function BackHeader({ title }) {
  // Accept title as string with two words like "Home page" to color separately.
  const parts = String(title || "").split(/\s+/);
  const first = parts.slice(0, 1).join(" ");
  const rest = parts.slice(1).join(" ");

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.leftIcon}>
        <Ionicons name="search-outline" size={20} color="#2fb2ff" />
      </TouchableOpacity>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>
          <Text style={styles.titlePrimary}>{first ? first + " " : ""}</Text>
          <Text style={styles.titleAccent}>{rest}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.rightIcon}>
        <Ionicons name="menu" size={22} color="#ff39c4" />
      </TouchableOpacity>
    </View>
  );
}

export function BottomNavigation({
  active = "home",
  onTabChange = () => {},
  visible = true,
}) {
  const tabs = [
    { key: "home", label: "Home", icon: "home" },
    { key: "discover", label: "Discover", icon: "compass" },
    { key: "albums", label: "Albums", icon: "musical-notes" },
    { key: "library", label: "Library", icon: "library" },
  ];

  return (
    <View style={[styles.bottomWrap, visible ? styles.visible : styles.hidden]}>
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <TouchableOpacity
            key={t.key}
            style={styles.tab}
            onPress={() => onTabChange(t.key)}
          >
            <Ionicons
              name={isActive ? t.icon : t.icon + "-outline"}
              size={28}
              color={isActive ? "#ff39c4" : "#2fb2ff"}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? "#ff39c4" : "#2fb2ff" },
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "#0f0f10",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrap: { flex: 1, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "800" },
  titlePrimary: { color: "#2fb2ff" },
  titleAccent: { color: "#ff39c4" },
  leftIcon: { padding: 8 },
  rightIcon: { padding: 8 },
  bottomWrap: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 74,
    backgroundColor: "#131416",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  visible: { opacity: 1, transform: [{ translateY: 0 }], zIndex: 10 },
  hidden: { opacity: 0, transform: [{ translateY: 30 }], zIndex: 0 },
  tab: { alignItems: "center", justifyContent: "center" },
  tabLabel: { marginTop: 6, fontSize: 12 },
});
