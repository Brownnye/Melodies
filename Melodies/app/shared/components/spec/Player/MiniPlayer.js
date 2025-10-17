import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import placeholder from "../../../../../assets/image/icon.png";
import NavContext from "../../../../context/NavContext";

export default function MiniPlayer({ track = {} }) {
  const { title = "White America", artist = "Eminem", cover } = track;
  const [playing, setPlaying] = useState(false);
  const nav = useContext(NavContext);
  const bottomVisible = nav?.bottomNavVisible ?? true;
  const bottomOffset = bottomVisible ? 110 : 36; // lift when nav visible

  return (
    <View style={[styles.container, { bottom: bottomOffset, zIndex: 20 }]}>
      <Image source={cover || placeholder} style={styles.cover} />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.ctrl}>
          <Ionicons name="play-back" size={18} color="#2fb2ff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ctrl}
          onPress={() => setPlaying((p) => !p)}
        >
          <Ionicons
            name={playing ? "pause" : "play"}
            size={22}
            color="#ff39c4"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrl}>
          <Ionicons name="play-forward" size={18} color="#2fb2ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 36,
    backgroundColor: "#1b1b1b",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 12,
  },
  cover: { width: 56, height: 56, borderRadius: 6, marginRight: 12 },
  meta: { flex: 1 },
  title: { color: "#fff", fontWeight: "700" },
  artist: { color: "#c6c6c6", marginTop: 4 },
  controls: { flexDirection: "row", alignItems: "center" },
  ctrl: { marginLeft: 8 },
});
