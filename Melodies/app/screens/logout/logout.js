import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const SignUpScreen = ({ onNavigateToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    // Handle sign up logic here
    console.log("Sign up attempt:", { name, email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log("Facebook login");
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password");
  };

  const handleLoginNavigation = () => {
    // Handle navigation to login
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
    console.log("Navigate to login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1423" />

      {/* Animated Background */}
      <View style={styles.backgroundContainer}>
        <View style={[styles.backgroundCircle, styles.circle1]} />
        <View style={[styles.backgroundCircle, styles.circle2]} />
        <View style={[styles.backgroundCircle, styles.circle3]} />
      </View>

      <LinearGradient
        colors={[
          "rgba(15, 20, 35, 0.95)",
          "rgba(26, 32, 47, 0.9)",
          "rgba(15, 20, 35, 0.95)",
        ]}
        style={styles.gradient}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>♪</Text>
            </View>
          </View>
          <Text style={styles.brandName}>Melodies</Text>
        </View>

        {/* Sign Up Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.formWrapper}>
            <Text style={styles.title}>Create An Account</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your Name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-Mail</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your E-Mail"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <LinearGradient
                colors={["#ff00ff", "#ff0080"]}
                style={styles.signUpButtonGradient}
              >
                <Text style={styles.signUpButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot password {">"}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
              >
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialButtonText}>Google Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookLogin}
              >
                <Text style={styles.socialIcon}>f</Text>
                <Text style={styles.socialButtonText}>Facebook Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1423",
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  backgroundCircle: {
    position: "absolute",
    borderRadius: 200,
    opacity: 0.15,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: "#ff00ff",
    top: "15%",
    right: "-10%",
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: "#00ffff",
    bottom: "30%",
    left: "-8%",
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: "#ff0080",
    top: "40%",
    right: "20%",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#ff00ff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    color: "#ff00ff",
    fontWeight: "bold",
  },
  brandName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff00ff",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  formWrapper: {
    backgroundColor: "rgba(30, 35, 50, 0.8)",
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 45, 45, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(68, 68, 68, 0.8)",
  },
  inputIcon: {
    fontSize: 18,
    color: "#888",
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    height: "100%",
  },
  signUpButton: {
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 25,
    overflow: "hidden",
  },
  signUpButtonGradient: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  forgotPassword: {
    fontSize: 16,
    color: "#888",
    textAlign: "left",
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(136, 136, 136, 0.5)",
  },
  dividerText: {
    fontSize: 16,
    color: "#888",
    marginHorizontal: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // gap not supported; spacing will be handled via child margins
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(45, 45, 45, 0.9)",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(68, 68, 68, 0.8)",
  },
  socialIcon: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
    fontWeight: "bold",
  },
  socialButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
});

export default SignUpScreen;
