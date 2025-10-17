import React, { useState } from "react";
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

const sampleSongs = [
  {
    id: 1,
    title: "Whatever...",
    subtitle: "Imagine dragons",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: 2,
    title: "Skyfall",
    subtitle: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: 3,
    title: "Superman",
    subtitle: "Eminem",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: 4,
    title: "Shape Of You",
    subtitle: "Ed Sheeran",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: 5,
    title: "Gossip",
    subtitle: "Måneskin",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleArtists = [
  {
    id: "a1",
    title: "Eminiem",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a2",
    title: "Lana Del Rey",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a3",
    title: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "a4",
    title: "Harry Style",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleAlbums = [
  {
    id: "al1",
    title: "Adele 21",
    subtitle: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "al2",
    title: "Scorpion",
    subtitle: "Drake",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "al3",
    title: "Born To Die",
    subtitle: "Lana Del Ray",
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
    title: "Shape Of You",
    subtitle: "Ed Sheeran",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "v3",
    title: "Someone Like You",
    subtitle: "Adele",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleMixes = [
  {
    id: "m1",
    title: "Trending",
    subtitle: "",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "m2",
    title: "Weekly Top",
    subtitle: "",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "m3",
    title: "Most Viewed",
    subtitle: "",
    image: require("../../../assets/image/icon.png"),
  },
];

const sampleFeatures = [
  {
    id: "f1",
    title: "Billie Eilish",
    description:
      "You can have easy access to every song of billie eilish by just clicking on the Listen now button. You can also follow him too for supporting Her.",
    image: require("../../../assets/image/icon.png"),
  },
  {
    id: "f2",
    title: "Adele Spotlight",
    description: "New album out now.",
    image: require("../../../assets/image/icon.png"),
  },
];

export default function HomePage() {
  const [variant, setVariant] = useState("square");
  const [featureIndex, setFeatureIndex] = useState(0);

  const onPrevFeature = () =>
    setFeatureIndex(
      (i) => (i - 1 + sampleFeatures.length) % sampleFeatures.length
    );
  const onNextFeature = () =>
    setFeatureIndex((i) => (i + 1) % sampleFeatures.length);

  return (
    <View style={styles.page}>
      <BackHeader title="Home Page" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Weekly Top </Text>
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
          {sampleSongs.map((s) => (
            <SquareCard
              key={s.id}
              size={140}
              image={s.image}
              title={s.title}
              subtitle={s.subtitle}
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
              size={96}
              image={a.image}
              title={a.title}
              showTitle
            />
          ))}
        </ScrollView>

        {/* Add more sections similar to the design if needed */}

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Top </Text>
            <Text style={styles.sectionTitleAccent}>Albums</Text>
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
          {sampleAlbums.map((a) => (
            <SquareCard
              key={a.id}
              size={120}
              image={a.image}
              title={a.title}
              subtitle={a.subtitle}
              showOverlay
              openAlbum
            />
          ))}
        </ScrollView>

        <View style={{ height: 16 }} />

        <SquareCard
          variant="large"
          image={sampleFeatures[featureIndex].image}
          title={sampleFeatures[featureIndex].title}
          description={sampleFeatures[featureIndex].description}
          showButtons
          buttons={["Listen Now", "Follow"]}
          onPrev={onPrevFeature}
          onNext={onNextFeature}
        />

        <View style={{ height: 16 }} />

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
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitlePrimary}>Top </Text>
            <Text style={styles.sectionTitleAccent}>Mix's</Text>
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
          {sampleMixes.map((m) => (
            <SquareCard
              key={m.id}
              size={120}
              image={m.image}
              title={m.title}
              subtitle={m.subtitle}
              showOverlay
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
  row: { flexDirection: "row", marginTop: 8 },
});
