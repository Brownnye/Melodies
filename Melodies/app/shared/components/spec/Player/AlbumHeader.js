import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import placeholder from "../../../../../assets/image/icon.png";

export default function AlbumHeader({ album = {} }) {
  const { title = "Album Title", artist = "Artist", cover } = album;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={cover || placeholder} style={styles.cover} />
        <View style={styles.meta}>
          <Text style={styles.albumTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.artist}>{artist}</Text>

          <View style={styles.row}>
            <Text style={styles.small}>20 songs</Text>
            <Text style={[styles.small, { marginLeft: 12 }]}>1h 14m</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.playBtn}>
          <Ionicons name="play" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  card: {
    backgroundColor: "#9b1f23",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  cover: { width: 96, height: 96, borderRadius: 8, marginRight: 12 },
  meta: { flex: 1 },
  albumTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  artist: { color: "#f2dcdc", marginTop: 6 },
  row: { flexDirection: "row", marginTop: 8, alignItems: "center" },
  small: { color: "#ffe7e7", fontSize: 12 },
  playBtn: { backgroundColor: "#ff39c4", padding: 10, borderRadius: 28 },
});
