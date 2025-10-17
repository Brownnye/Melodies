import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BackHeader } from "../../shared/components/spec/Header/BackHeader";
import AlbumHeader from "../../shared/components/spec/Player/AlbumHeader";
import MiniPlayer from "../../shared/components/spec/Player/MiniPlayer";
import NavContext from "../../context/NavContext";
import placeholder from "../../../assets/image/icon.png";

const tracks = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: i === 15 ? "Till i collapse" : "White America",
  artist: "Eminem",
  duration: "4:57",
}));

export default function AlbumPage() {
  const nav = useContext(NavContext);
  const sel = nav && nav.selectedAlbum;
  return (
    <View style={styles.page}>
      <BackHeader title="Allbum" />

      <ScrollView contentContainerStyle={styles.content}>
        <AlbumHeader
          album={{
            title: sel?.title || "The Eminem Show",
            artist: sel?.artist || "Eminem",
            cover: sel?.image || placeholder,
          }}
        />

        <View style={styles.listHeader}>
          <Text style={styles.colTrack}>#</Text>
          <Text style={[styles.colTitle]}>Title</Text>
          <Text style={styles.colTime}>Time</Text>
        </View>

        {tracks.map((t) => (
          <View key={t.id} style={styles.trackRow}>
            <Text style={styles.trackIndex}>{t.id}</Text>
            <View style={styles.trackMeta}>
              <Text style={styles.trackTitle}>{t.title}</Text>
              <Text style={styles.trackArtist}>{t.artist}</Text>
            </View>
            <Text style={styles.trackTime}>{t.duration}</Text>
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={{ color: "#2fb2ff" }}>•••</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 160 }} />
      </ScrollView>

      <MiniPlayer
        track={{
          title: "White America",
          artist: "Eminem",
          cover: placeholder,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#0f0f10" },
  content: { padding: 0, paddingBottom: 300 },
  listHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: "center",
  },
  colTrack: { width: 28, color: "#b8b8b8" },
  colTitle: { flex: 1, color: "#fff", fontWeight: "700" },
  colTime: { width: 64, color: "#b8b8b8" },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: "#8b1f23",
  },
  trackIndex: { width: 28, color: "#fff", fontWeight: "700" },
  trackMeta: { flex: 1 },
  trackTitle: { color: "#fff", fontWeight: "700" },
  trackArtist: { color: "#f2dcdc", marginTop: 4 },
  trackTime: { width: 64, color: "#fff", textAlign: "right" },
  moreBtn: { width: 32, alignItems: "center" },
});
