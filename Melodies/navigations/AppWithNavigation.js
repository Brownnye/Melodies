import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import LoginScreen from "./app/page/login/login";
import SignUpScreen from "./app/page/logout/logout";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login"); // 'login' or 'signup'

  if (currentScreen === "login") {
    return (
      <View style={styles.container}>
        <LoginScreen onNavigateToSignUp={() => setCurrentScreen("signup")} />
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setCurrentScreen("signup")}
        >
          <Text style={styles.switchText}>Switch to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SignUpScreen onNavigateToLogin={() => setCurrentScreen("login")} />
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setCurrentScreen("login")}
      >
        <Text style={styles.switchText}>Switch to Login</Text>
      </TouchableOpacity>
    </View>
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
