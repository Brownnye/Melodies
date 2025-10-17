import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SquareCard from "../../shared/components/spec/Card/SquareCard";
import CircleCard from "../../shared/components/spec/Card/CircleCard";
import {
  BackHeader,
  BottomNavigation,
} from "../../shared/components/spec/Header/BackHeader";

const sampleGenres = [
  {
    id: "g1",
    title: "Rap Songs",
    subtitle: "Rap Tracks",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "g2",
    title: "Pop Songs",
    subtitle: "Pop Tracks",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "g3",
    title: "Rock Songs",
    subtitle: "Rock Tracks",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleMood = [
  {
    id: "m1",
    title: "Sad Songs",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "m2",
    title: "Workout Songs",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "m3",
    title: "Chill Songs",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleNew = [
  {
    id: "n1",
    title: "Time",
    subtitle: "Lusiano",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "n2",
    title: "112",
    subtitle: "Jazzek",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "n3",
    title: "We Dont Care",
    subtitle: "DL Gulum",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleArtists = [
  {
    id: "a1",
    title: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a2",
    title: "Eminiem",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a3",
    title: "Imagine Dr...",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a4",
    title: "Drake",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleVideos = [
  {
    id: "v1",
    title: "Gossip",
    subtitle: "Måneskin",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v2",
    title: "New Rules",
    subtitle: "DuaLipa",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v3",
    title: "Someone Like ...",
    subtitle: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v4",
    title: "Lovely",
    subtitle: "Billie, Khalid",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v5",
    title: "Waka Waka",
    subtitle: "Shakira",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v6",
    title: "Shape Of You",
    subtitle: "Ed Sheeran",
    image: require("../../../assets/image/icon.png"),
  },
];

export default function DiscoverPage() {
  return (
    <View style={styles.page}>
      <BackHeader title="Discover" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Music </Text>
            <Text style={styles.sectionTitleAccent}>Geners</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {sampleGenres.map((g) => (
            <SquareCard
              key={g.id}
              size={120}
              image={g.image}
              title={g.title}
              subtitle={g.subtitle}
              showOverlay
              openAlbum
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Mood </Text>
            <Text style={styles.sectionTitleAccent}>Playlist</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {sampleMood.map((m) => (
            <SquareCard
              key={m.id}
              size={140}
              image={m.image}
              title={m.title}
              showOverlay
              openAlbum
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>New Release </Text>
            <Text style={styles.sectionTitleAccent}>Songs</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {sampleNew.map((n) => (
            <SquareCard
              key={n.id}
              size={140}
              image={n.image}
              title={n.title}
              subtitle={n.subtitle}
              showOverlay
              openAlbum
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Popular </Text>
            <Text style={styles.sectionTitleAccent}>Artists</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {sampleArtists.map((a) => (
            <CircleCard
              key={a.id}
              size={86}
              image={a.image}
              title={a.title}
              showTitle
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Music </Text>
            <Text style={styles.sectionTitleAccent}>Video</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {sampleVideos.map((v) => (
            <SquareCard
              key={v.id}
              size={140}
              image={v.image}
              title={v.title}
              subtitle={v.subtitle}
              showOverlay
              openAlbum
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* BottomNavigation is rendered by App.js via NavContext */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#0f0f10" },
  content: { padding: 24, paddingBottom: 300 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  sectionTitlePrimary: { color: "#fff" },
  sectionTitleAccent: { color: "#ff39c4" },
  viewAll: { color: "#2fb2ff", fontSize: 12 },
  hRow: { paddingLeft: 0, paddingRight: 0 },
});
