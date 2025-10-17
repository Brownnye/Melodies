import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function CircleCard(props) {
  const { size = 96, image, title, showTitle = false, onPress, style } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Image
        source={image}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: "#1e1e1e",
          },
        ]}
        resizeMode="cover"
      />
      {showTitle && (
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginRight: 16 },
  avatar: {
    backgroundColor: "#222",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  title: {
    color: "#fff",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
