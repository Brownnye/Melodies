import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BackHeader } from "../../shared/components/spec/Header/BackHeader";
import MiniPlayer from "../../shared/components/spec/Player/MiniPlayer";
import PlaylistModal from "../../shared/components/spec/Modal/PlaylistModal";
import { fetchSongs } from "../../redux/slices/songsSlice";
import { fetchAlbums } from "../../redux/slices/albumsSlice";
import { fetchArtists } from "../../redux/slices/artistsSlice";
import {
  fetchUserPlaylists,
  createPlaylist,
} from "../../redux/slices/playlistsSlice";
import NavContext from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";
import placeholder from "../../../assets/image/icon.png";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("playlists");
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistErrorMessage, setPlaylistErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navContext = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const { showPlayer, currentTrack, showBottomNav, setBottomNavVisible } =
    navContext || {};

  const songs = useSelector((state) => state.songs.items);
  const albums = useSelector((state) => state.albums.items);
  const artists = useSelector((state) => state.artists.items);
  const userPlaylists = useSelector((state) => state.playlists.userPlaylists);

  // Get userId from authenticated user
  const userId = user?._id;

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isNearBottom) {
      showBottomNav && showBottomNav();
    }
  };

  const handleCreatePlaylist = async (playlistName) => {
    try {
      // Check if playlist name already exists
      const nameExists = userPlaylists.some(
        (playlist) =>
          playlist.title.toLowerCase() === playlistName.toLowerCase()
      );

      if (nameExists) {
        setPlaylistErrorMessage(
          `Playlist "${playlistName}" đã tồn tại. Vui lòng chọn tên khác.`
        );
        return; // Keep modal open
      }

      const newPlaylist = {
        title: playlistName,
        songIds: [],
        userId: userId,
        isPublic: false,
        description: "",
      };

      const resultAction = await dispatch(createPlaylist(newPlaylist));
      const createdPlaylist = resultAction.payload;

      // Clear error and close modal on success
      setPlaylistErrorMessage("");
      setShowPlaylistModal(false);

      if (navContext.setSelectedPlaylist && navContext.navigateWithHistory) {
        navContext.setSelectedPlaylist(createdPlaylist);
        navContext.navigateWithHistory("playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      Alert.alert("Lỗi", "Không thể tạo playlist");
    }
  };

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchAlbums());
    dispatch(fetchArtists());
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch]);

  // Refresh playlists when page is focused/visible
  useEffect(() => {
    const refreshPlaylists = () => {
      dispatch(fetchUserPlaylists(userId));
    };

    // Refresh when component mounts or becomes visible
    refreshPlaylists();

    // Set up interval to refresh periodically (optional)
    const interval = setInterval(refreshPlaylists, 5000);

    return () => clearInterval(interval);
  }, [dispatch, userId]);

  // Get random favorite song
  const getFavoriteSong = () => {
    if (songs.length > 0) {
      return songs[Math.floor(Math.random() * songs.length)];
    }
    return null;
  };

  const favoriteSong = getFavoriteSong();

  // Render Playlist Tab
  const renderPlaylistsTab = () => {
    const { recentSongs = [], recentArtists = [] } = navContext || {};

    return (
      <View style={styles.tabContent}>
        {/* Bài hát mới nghe gần đây */}
        <Text style={styles.sectionTitle}>Bài hát mới nghe gần đây</Text>
        {recentSongs.length === 0 ? (
          <View style={styles.emptyStateSmall}>
            <Text style={styles.emptyStateTextSmall}>Chưa nghe bài nào</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {recentSongs.map((song, index) => {
              console.log(`LibraryPage - Recent Song ${index}:`, {
                title: song.title,
                coverUrl: song.coverUrl,
              });

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSongCard}
                  onPress={async () => {
                    if (!navContext) return;

                    const {
                      getAudioSource,
                    } = require("../../constants/audioMap");
                    const { getLyrics } = require("../../constants/lyricsMap");
                    const audioService =
                      require("../../services/audioService").default;

                    // Get audio source and lyrics
                    const audioSource = getAudioSource(song.audioUrl);
                    const lyricsData = getLyrics(
                      song.audioUrl || song.lyricsUrl
                    );

                    if (!audioSource) {
                      console.error("No audio source found for:", song.title);
                      return;
                    }

                    // Create queue from all songs
                    const queue = songs
                      .slice(0, 10)
                      .map((s) => ({
                        title: s.title,
                        artist: s.artist,
                        cover: s.coverUrl ? { uri: s.coverUrl } : placeholder,
                        coverUrl: s.coverUrl,
                        audioUrl: getAudioSource(s.audioUrl),
                        lyricsUrl: s.lyricsUrl || s.audioUrl,
                      }))
                      .filter((item) => item.audioUrl);

                    // Add to recent history
                    if (navContext?.addToRecentSongs) {
                      navContext.addToRecentSongs(song);
                    }

                    // Add artist to recent history
                    if (navContext?.addToRecentArtists && song.artist) {
                      navContext.addToRecentArtists({
                        name: song.artist,
                        photoUrl: song.coverUrl,
                        _id: song.artist,
                      });
                    }

                    // Set current track
                    navContext.setCurrentTrack({
                      title: song.title,
                      artist: song.artist,
                      cover: song.coverUrl
                        ? { uri: song.coverUrl }
                        : placeholder,
                      audioUrl: audioSource,
                      lyrics: lyricsData,
                      queue: queue,
                    });
                    navContext.setShowPlayer(true);

                    // Play audio
                    await audioService.initialize();
                    const loaded = await audioService.loadSound(audioSource);
                    if (loaded) {
                      await audioService.play();
                    }
                  }}
                >
                  <Image
                    source={
                      song.coverUrl ? { uri: song.coverUrl } : placeholder
                    }
                    style={styles.recentSongImage}
                  />
                  <Text style={styles.recentSongTitle} numberOfLines={1}>
                    {song.title}
                  </Text>
                  <Text style={styles.recentSongArtist} numberOfLines={1}>
                    {song.artist}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Ca sĩ đã nghe gần đây */}
        <Text style={styles.sectionTitle}>Ca sĩ đã nghe gần đây</Text>
        {recentArtists.length === 0 ? (
          <View style={styles.emptyStateSmall}>
            <Text style={styles.emptyStateTextSmall}>Chưa nghe ca sĩ nào</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {recentArtists.map((artist, index) => {
              console.log(`LibraryPage - Recent Artist ${index}:`, {
                name: artist.name,
                photoUrl: artist.photoUrl,
              });

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.recentArtistCard}
                  onPress={() => {
                    if (navContext?.navigateWithHistory) {
                      navContext.setSelectedArtist(artist);
                      navContext.navigateWithHistory("artists", { artist });
                    }
                  }}
                >
                  <Image
                    source={
                      artist.photoUrl ? { uri: artist.photoUrl } : placeholder
                    }
                    style={styles.recentArtistImage}
                  />
                  <Text style={styles.recentArtistName} numberOfLines={1}>
                    {artist.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Playlist của bạn */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Playlist của bạn</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowPlaylistModal(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {userPlaylists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Chưa có playlist nào</Text>
            <Text style={styles.emptyStateSubtext}>
              Nhấn + để tạo playlist mới
            </Text>
          </View>
        ) : (
          userPlaylists.map((playlist, index) => (
            <TouchableOpacity
              key={playlist._id || index}
              style={styles.playlistItem}
              onPress={() => {
                if (
                  navContext.setSelectedPlaylist &&
                  navContext.navigateWithHistory
                ) {
                  navContext.setSelectedPlaylist(playlist);
                  navContext.navigateWithHistory("playlist");
                }
              }}
            >
              <View style={styles.playlistItemImagePlaceholder}>
                <Text style={styles.playlistItemIcon}>🎵</Text>
              </View>
              <View style={styles.playlistItemInfo}>
                <Text style={styles.playlistItemTitle} numberOfLines={1}>
                  {playlist.title}
                </Text>
                <Text style={styles.playlistItemArtist}>
                  {playlist.songIds?.length || 0} songs
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  // Render Albums Tab
  const renderAlbumsTab = () => {
    const { favoriteAlbums = [] } = navContext || {};

    console.log("LibraryPage - Favorite Albums:", favoriteAlbums);
    console.log("LibraryPage - Count:", favoriteAlbums.length);

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Album đã lưu</Text>

        {favoriteAlbums.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Chưa có album yêu thích</Text>
            <Text style={styles.emptyStateSubtext}>
              Nhấn "Theo dõi" ở trang album để lưu vào thư viện
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteAlbums}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.albumGridItem}
                onPress={() => {
                  if (navContext.navigateWithHistory) {
                    navContext.setSelectedAlbum(item);
                    navContext.navigateWithHistory("albums", { album: item });
                  }
                }}
              >
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image || placeholder
                  }
                  style={styles.albumGridImage}
                />
                <Text style={styles.albumGridTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.albumGridArtist} numberOfLines={1}>
                  {item.artist}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };

  // Render New AI Tab (Bài hát)
  const renderNewAITab = () => {
    const { favoriteSongs = [], setFavoriteSongs } = navContext || {};

    const handleToggleFavorite = (song) => {
      const songId = song._id || `${song.title}-${song.artist}`;
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
        setFavoriteSongs([...favoriteSongs, song]);
      }
    };

    console.log("LibraryPage - Favorite Songs:", favoriteSongs);
    console.log("LibraryPage - Count:", favoriteSongs.length);

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Bài hát yêu thích</Text>

        {favoriteSongs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Chưa có bài hát yêu thích</Text>
            <Text style={styles.emptyStateSubtext}>
              Nhấn vào biểu tượng tim để thêm bài hát yêu thích
            </Text>
          </View>
        ) : (
          favoriteSongs.map((song) => (
            <TouchableOpacity
              key={song._id || `${song.title}-${song.artist}`}
              style={styles.songItem}
            >
              <Image
                source={song.coverUrl ? { uri: song.coverUrl } : placeholder}
                style={styles.songItemImage}
              />
              <View style={styles.songItemInfo}>
                <Text style={styles.songItemTitle} numberOfLines={1}>
                  {song.title}
                </Text>
                <Text style={styles.songItemArtist}>{song.artist}</Text>
              </View>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleToggleFavorite(song)}
              >
                <Text style={styles.heartButtonIcon}>♥</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  // Render Nghệ sĩ Tab
  const renderNgheSiTab = () => {
    const { favoriteArtists = [] } = navContext || {};

    console.log("LibraryPage - Favorite Artists:", favoriteArtists);
    console.log("LibraryPage - Count:", favoriteArtists.length);

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Nghệ sĩ theo dõi</Text>

        {favoriteArtists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Chưa có nghệ sĩ yêu thích</Text>
            <Text style={styles.emptyStateSubtext}>
              Nhấn "Theo dõi" ở trang nghệ sĩ để lưu vào thư viện
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteArtists}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.artistGridItem}
                onPress={() => {
                  if (navContext.navigateWithHistory) {
                    navContext.setSelectedArtist(item);
                    navContext.navigateWithHistory("artists", { artist: item });
                  }
                }}
              >
                <Image
                  source={item.photoUrl ? { uri: item.photoUrl } : placeholder}
                  style={styles.artistGridImage}
                />
                <Text style={styles.artistGridName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <BackHeader title="Library" />

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "playlists" && styles.tabActive]}
          onPress={() => setActiveTab("playlists")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "playlists" && styles.tabTextActive,
            ]}
          >
            Playlist của bạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "albums" && styles.tabActive]}
          onPress={() => setActiveTab("albums")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "albums" && styles.tabTextActive,
            ]}
          >
            Album
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "newai" && styles.tabActive]}
          onPress={() => setActiveTab("newai")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "newai" && styles.tabTextActive,
            ]}
          >
            Bài hát
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "nghesi" && styles.tabActive]}
          onPress={() => setActiveTab("nghesi")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "nghesi" && styles.tabTextActive,
            ]}
          >
            Nghệ sĩ
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {activeTab === "playlists" && renderPlaylistsTab()}
        {activeTab === "albums" && renderAlbumsTab()}
        {activeTab === "newai" && renderNewAITab()}
        {activeTab === "nghesi" && renderNgheSiTab()}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MiniPlayer - Show when a song is playing */}
      {showPlayer && currentTrack && <MiniPlayer track={currentTrack} />}

      {/* Playlist Modal */}
      <PlaylistModal
        visible={showPlaylistModal}
        onClose={() => {
          setShowPlaylistModal(false);
          setPlaylistErrorMessage(""); // Clear error when closing
        }}
        onCreatePlaylist={handleCreatePlaylist}
        errorMessage={playlistErrorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0f0f10",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1a1a1d",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tab: {
    marginRight: 20,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#ff39c4",
  },
  tabText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabContent: {
    flex: 1,
  },

  // Favorite Card
  favoriteCard: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    position: "relative",
  },
  favoriteImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  favoriteOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff39c4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  heartIcon: {
    color: "#fff",
    fontSize: 24,
  },
  favoriteTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteArtist: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },
  favoriteCount: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  // Section Title
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2d2d2d",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 28,
  },

  // Song Item
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1d",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  songItemImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  songItemInfo: {
    flex: 1,
  },
  songItemTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  songItemArtist: {
    color: "#888",
    fontSize: 13,
    marginTop: 4,
  },
  heartButton: {
    padding: 8,
    marginRight: 8,
  },
  heartButtonIcon: {
    color: "#ff39c4",
    fontSize: 20,
  },
  moreIcon: {
    color: "#888",
    fontSize: 20,
  },

  // Filter Row
  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#2d2d2d",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterActive: {
    backgroundColor: "#ff39c4",
  },
  filterText: {
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },

  // Album Grid
  albumGridItem: {
    flex: 1,
    margin: 6,
    maxWidth: "30%",
  },
  albumGridImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumGridTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  albumGridArtist: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  emptyStateSmall: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  emptyStateTextSmall: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },

  // Artist Grid
  artistGridItem: {
    flex: 1,
    margin: 6,
    alignItems: "center",
    maxWidth: "30%",
  },
  artistGridImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  artistGridName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  artistGridInfo: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
    textAlign: "center",
  },

  // Horizontal Scroll Sections
  horizontalScroll: {
    marginBottom: 24,
  },
  recentSongCard: {
    width: 140,
    marginRight: 12,
  },
  recentSongImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentSongTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  recentSongArtist: {
    color: "#888",
    fontSize: 12,
  },
  recentArtistCard: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  recentArtistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  recentArtistName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1d",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  playlistItemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  playlistItemIcon: {
    fontSize: 24,
  },
  playlistItemInfo: {
    flex: 1,
  },
  playlistItemTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  playlistItemArtist: {
    color: "#888",
    fontSize: 13,
  },
});
