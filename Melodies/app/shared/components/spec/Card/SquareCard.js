import React, { useContext } from "react";
import NavContext from "../../../../context/NavContext";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";

export default function SquareCard(props) {
  const {
    size = 140,
    image,
    title,
    subtitle,
    showOverlay = false,
    onPress,
    style,
    description,
    showButtons = false,
    buttons = [],
    variant = "square",
    onPrev = () => {},
    onNext = () => {},
  } = props;

  const nav = useContext(NavContext);

  const handlePress = () => {
    if (props.openAlbum && nav && nav.setSelectedAlbum) {
      nav.setSelectedAlbum({ title, image });
      if (nav.showBottomNav) nav.showBottomNav();
      nav.setActiveTab("albums");
      return;
    }
    if (onPress) onPress();
  };

  const renderLarge = (
    <ImageBackground
      source={image}
      style={styles.largeBackground}
      imageStyle={styles.largeImage}
    >
      <View style={styles.largeOverlayRow}>
        <View style={styles.largeTextOverlay}>
          <Text style={[styles.title, styles.titleLarge]}>{title}</Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
          {showButtons && buttons && (
            <View style={styles.buttonRow}>
              {buttons.map((b, i) => (
                <TouchableOpacity
                  key={i}
                  style={
                    i === 0
                      ? [styles.ctaButton, styles.primaryBtn]
                      : [styles.ctaButton, styles.secondaryBtn]
                  }
                >
                  <Text
                    style={
                      i === 0
                        ? [styles.ctaText, styles.primaryText]
                        : [styles.ctaText, styles.secondaryText]
                    }
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.largePreviewSpace} />
      </View>

      <View style={styles.largeArrows}>
        <TouchableOpacity style={styles.arrowBtn} onPress={onPrev}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn} onPress={onNext}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const renderSmall = (
    <View style={styles.smallInner}>
      <View style={styles.imageWrap}>
        <Image
          source={image}
          style={[styles.image, { width: size - 16, height: size - 16 }]}
          resizeMode="cover"
        />
        {showOverlay && <View style={styles.overlay} />}
      </View>
      <View style={styles.textWrap}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[
        styles.container,
        variant === "large" ? { width: "100%", padding: 0 } : { width: size },
        style,
      ]}
    >
      <View>{variant === "large" ? renderLarge : renderSmall}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f0f10",
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
    overflow: "hidden",
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  image: {
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  // badge styles removed
  textWrap: { marginTop: 10 },
  smallInner: { alignItems: "flex-start" },
  captionBg: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 10,
    borderRadius: 10,
  },
  captionLarge: {
    padding: 12,
    borderRadius: 12,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  titleLarge: { fontSize: 20 },
  subtitle: { color: "#b0b6bf", fontSize: 13, marginTop: 4 },
  subtitleLarge: { fontSize: 14 },
  description: { color: "#d0d6db", fontSize: 12, marginTop: 8, lineHeight: 16 },
  buttonRow: { flexDirection: "row", marginTop: 12 },
  ctaButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  primaryBtn: { backgroundColor: "#ff39c4", borderColor: "#ff39c4" },
  secondaryBtn: { backgroundColor: "transparent", borderColor: "#2fb2ff" },
  ctaText: { fontSize: 13, fontWeight: "700" },
  primaryText: { color: "#000" },
  secondaryText: { color: "#2fb2ff" },
  /* large variant styles */
  largeBackground: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    justifyContent: "flex-end",
  },
  largeImage: { width: "100%", height: "100%" },
  largeOverlayRow: { flexDirection: "row", alignItems: "stretch" },
  largeTextOverlay: {
    width: "65%",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  largePreviewSpace: { width: "35%" },
  largeArrows: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
  },
  arrowBtn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  arrowText: { color: "#fff", fontWeight: "700" },
});
