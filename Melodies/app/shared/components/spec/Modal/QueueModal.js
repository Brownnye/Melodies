import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavContext from "../../../../context/NavContext";
const placeholderImage = require("../../../../../assets/image/icon.png");

export default function QueueModal({
  visible,
  onClose,
  queue = [],
  currentTrack,
  onTrackPress,
  onAddToPlaylist,
}) {
  const navContext = useContext(NavContext);
  const { favoriteSongs = [], setFavoriteSongs } = navContext || {};

  const handleToggleFavorite = (track) => {
    const songId = track._id || `${track.title}-${track.artist}`;
    const isFavorite = favoriteSongs.some(
      (s) => (s._id || `${s.title}-${s.artist}`) === songId
    );

    if (isFavorite) {
      // Remove from favorites
      setFavoriteSongs(
        favoriteSongs.filter(
          (s) => (s._id || `${s.title}-${s.artist}`) !== songId
        )
      );
    } else {
      // Add to favorites
      setFavoriteSongs([...favoriteSongs, track]);
    }
  };

  const isSongFavorite = (track) => {
    const songId = track._id || `${track.title}-${track.artist}`;
    return favoriteSongs.some(
      (s) => (s._id || `${s.title}-${s.artist}`) === songId
    );
  };

  const handleToggleCurrentTrackFavorite = () => {
    if (currentTrack) {
      handleToggleFavorite(currentTrack);
    }
  };

  const isCurrentTrackFavorite = currentTrack
    ? isSongFavorite(currentTrack)
    : false;

  const quickActions = [
    {
      icon: isCurrentTrackFavorite ? "heart" : "heart-outline",
      label: "Yêu thích",
      color: isCurrentTrackFavorite ? "#ff39c4" : "#888",
      onPress: handleToggleCurrentTrackFavorite,
    },
    { icon: "options-outline", label: "Bộ chỉnh âm", color: "#888" },
    {
      icon: "add-outline",
      label: "Thêm vào\nplaylist",
      color: "#888",
      onPress: onAddToPlaylist,
    },
    { icon: "list", label: "Thêm vào\ndanh sách", color: "#888" },
    { icon: "timer-outline", label: "Hẹn giờ", color: "#888" },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.modalContent}>
          {/* Drag indicator */}
          <View style={styles.dragIndicator} />

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionBtn}
                onPress={action.onPress}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Danh sách chờ{" "}
              <Text style={styles.sectionSubtitle}>(không giới hạn)</Text>
            </Text>
            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Queue List */}
          <ScrollView style={styles.queueList}>
            {queue.length > 0 ? (
              queue.map((track, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.queueItem}
                  onPress={() => onTrackPress && onTrackPress(track)}
                >
                  <Image
                    source={
                      // Prefer a direct `cover` prop (could be an object like {uri:...} or a string),
                      // then `coverUrl`, then `photoUrl`, otherwise fallback to placeholder
                      track.cover
                        ? typeof track.cover === "string"
                          ? { uri: track.cover }
                          : track.cover
                        : track.coverUrl && track.coverUrl !== ""
                        ? { uri: track.coverUrl }
                        : track.photoUrl && track.photoUrl !== ""
                        ? { uri: track.photoUrl }
                        : placeholderImage
                    }
                    style={styles.queueItemCover}
                  />
                  <View style={styles.queueItemInfo}>
                    <Text
                      style={[
                        styles.queueItemTitle,
                        currentTrack?.title === track.title &&
                          styles.activeTrack,
                      ]}
                      numberOfLines={1}
                    >
                      {track.title}
                    </Text>
                    <Text style={styles.queueItemArtist} numberOfLines={1}>
                      {track.artist}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => handleToggleFavorite(track)}
                  >
                    <Text
                      style={[
                        styles.heartIcon,
                        isSongFavorite(track) && styles.heartIconActive,
                      ]}
                    >
                      ♥
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyQueue}>
                <Text style={styles.emptyText}>
                  ••• Luôn luôn để xuất cho bạn •••
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#d4c4bc",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 0,
    maxHeight: "85%",
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#8b7b73",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 4,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 0,
    paddingTop: 8,
  },
  quickActionBtn: {
    alignItems: "center",
    width: 70,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#b8a8a0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: 11,
    color: "#2d2520",
    textAlign: "center",
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: "#b8a8a0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d2520",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6d5d55",
  },
  queueList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  queueItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#c4b4ac",
  },
  queueItemCover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  queueItemInfo: {
    flex: 1,
  },
  heartButton: {
    padding: 8,
    marginLeft: 8,
  },
  heartIcon: {
    fontSize: 24,
    color: "#888",
  },
  heartIconActive: {
    color: "#ff39c4",
  },
  queueItemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2d2520",
    marginBottom: 4,
  },
  activeTrack: {
    color: "#ff39c4",
  },
  queueItemArtist: {
    fontSize: 13,
    color: "#6d5d55",
    marginBottom: 4,
  },
  queueItemMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  metaText: {
    fontSize: 12,
    color: "#8b7b73",
  },
  emptyQueue: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#8b7b73",
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d2520",
  },
});
