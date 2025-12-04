// Map audio filenames to require statements
export const audioMap = {
  skyfall: require("../../assets/audio/adele/skyfall/skyfall.mp3"),
  // Adele - 21 mappings (place MP3 files at these paths)
  // Files found in `assets/audio/adele` — require exact filenames present on disk
  rollinginthedeep: require("../../assets/audio/adele/rolling in the deep/Adele - Rolling in the Deep (Official Music Video) - Adele.mp3"),
  someonelikeyou: require("../../assets/audio/adele/some one like you/Adele - Someone Like You (Official Music Video) - Adele.mp3"),
  rumourhasit: require("../../assets/audio/adele/rumour has it/Rumour Has It - Adele.mp3"),
  turningtables: require("../../assets/audio/adele/Turning Tables/Turning Tables - Adele.mp3"),
  dontyouremember: require("../../assets/audio/adele/Dont't  You Remmember/Don't You Remember - Adele.mp3"),
  setfiretotherain: require("../../assets/audio/adele/Set Fire to the Rain/Set Fire to the Rain - Adele.mp3"),
  hewontgo: require("../../assets/audio/adele/He Won't Go/He Won't Go - Adele.mp3"),
  illbewaiting: require("../../assets/audio/adele/I'll Be Waiting/I'll Be Waiting - Adele.mp3"),
  oneandonly: require("../../assets/audio/adele/One and Only/One And Only - Adele.mp3"),
  lovesong: require("../../assets/audio/adele/Love Song/Lovesong - Adele.mp3"),
  takeitall: require("../../assets/audio/adele/Take It All/Take It All - Adele.mp3"),
  whiteamerica: require("../../assets/audio/eninem/white america/White America - Eminem.mp3"),
  business: require("../../assets/audio/eninem/Business/Business - Eminem.mp3"),
  cleaninoutmycloset: require("../../assets/audio/eninem/Cleanin Out My Closet/Eminem - Cleanin' Out My Closet (Official Music Video) - EminemVEVO.mp3"),
  squaredance: require("../../assets/audio/eninem/Square Dance/Square Dance - Eminem.mp3"),
  whenthemusicstops: require("../../assets/audio/eninem/When The Music Stops/When The Music Stops - Eminem.mp3"),
  soldier: require("../../assets/audio/eninem/Soldier/Soldier - Eminem.mp3"),
  saygoodbyehollywood: require("../../assets/audio/eninem/Say Goodbye Hollywood/Say Goodbye Hollywood - Eminem.mp3"),
  drips: require("../../assets/audio/eninem/Drips/Drips - Eminem.mp3"),
  withoutme: require("../../assets/audio/eninem/Without me/Eminem - Without Me (Audio) - YOUMUSIC.mp3"),
  singforthemoment: require("../../assets/audio/eninem/Sing For The Moment/Sing For The Moment - Eminem.mp3"),
  superman: require("../../assets/audio/eninem/Superman/Eminem - Superman - LatinHype.mp3"),
  hailiessong: require("../../assets/audio/eninem/Hailie's Song/Hailie's Song - Eminem.mp3"),
  tillicollapse: require("../../assets/audio/eninem/Till i Collapse/Eminem - Till I Collapse [HD] - msvogue23.mp3"),
  tillicolapse: require("../../assets/audio/eninem/Till i Collapse/Eminem - Till I Collapse [HD] - msvogue23.mp3"), // Alias for typo
  saywhatyousay: require("../../assets/audio/eninem/Say What You Say/Say What You Say - Eminem.mp3"),
  mydadsgonecrazy: require("../../assets/audio/eninem/My Dad Gone Crazy/My Dad's Gone Crazy - Eminem.mp3"),
  mydadgonecrazy: require("../../assets/audio/eninem/My Dad Gone Crazy/My Dad's Gone Crazy - Eminem.mp3"), // Alias
  godzilla: require("../../assets/audio/eninem/Godzilla/Eminem - Godzilla (Lyrics) ft. Juice WRLD - FutureHype.mp3"),
  loseyourself: require("../../assets/audio/eninem/Lose Yourself/Eminem - Lose Yourself (Lyrics) - 7clouds.mp3"),
  mockingbird: require("../../assets/audio/eninem/Mocking Birds/Eminem - Mockingbird (Lyrics) - Dan Music.mp3"),
  mockingbirds: require("../../assets/audio/eninem/Mocking Birds/Eminem - Mockingbird (Lyrics) - Dan Music.mp3"), // Alias
  therealslimshady: require("../../assets/audio/eninem/The Real Slim Shady/Eminem - The Real Slim Shady (Lyrics) - 7clouds.mp3"),
  // Thêm các bài khác vào đây...
};

// Helper function to get audio source
export const getAudioSource = (audioUrl) => {
  if (!audioUrl) return null;

  // If audioUrl is already a valid audio source (number from require()), return it
  if (
    typeof audioUrl === "number" ||
    (typeof audioUrl === "object" && audioUrl !== null)
  ) {
    return audioUrl;
  }

  // If it's a string, try to extract the filename/key
  if (typeof audioUrl === "string") {
    console.log("getAudioSource - input:", audioUrl);

    // If it's already an http(s) URL, return as uri object for Expo Audio
    if (audioUrl.startsWith("http://") || audioUrl.startsWith("https://")) {
      console.log("getAudioSource - using HTTP URL as source:", audioUrl);
      return { uri: audioUrl };
    }

    // First, try direct lookup
    if (audioMap[audioUrl]) {
      console.log("getAudioSource - found direct match for:", audioUrl);
      return audioMap[audioUrl];
    }
    console.log("getAudioSource - no direct match, trying alternatives...");

    // Decode URL encoding if present
    let decodedUrl = audioUrl;
    try {
      decodedUrl = decodeURIComponent(audioUrl);
    } catch (e) {
      console.warn("Failed to decode URL:", audioUrl);
    }

    // Remove query parameters if present (e.g., ?unstable_path=...)
    if (decodedUrl.includes("?")) {
      const queryIndex = decodedUrl.indexOf("?");
      const queryPart = decodedUrl.substring(queryIndex + 1);

      // Check if it's unstable_path parameter
      if (queryPart.startsWith("unstable_path=")) {
        decodedUrl = queryPart.substring("unstable_path=".length);
        // Decode again if needed
        try {
          decodedUrl = decodeURIComponent(decodedUrl);
        } catch (e) {
          // Already decoded
        }
      } else {
        // Just remove query string
        decodedUrl = decodedUrl.substring(0, queryIndex);
      }
    }

    console.log("Processing audio URL:", decodedUrl);

    // If audioUrl is a full path like "/assets/.../skyfall/skyfall.mp3"
    // Extract the filename without extension
    const parts = decodedUrl.split("/");
    const filename = parts[parts.length - 1]; // Get "My Dad's Gone Crazy - Eminem.mp3"
    const filenameWithoutExt = filename.replace(/\.[^/.]+$/, ""); // Get "My Dad's Gone Crazy - Eminem"

    // Try to find in audioMap - remove all special chars and spaces
    const key = filenameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, ""); // Get "mydadsgonecrazyeminem"

    console.log("Extracted filename:", filename);
    console.log("Extracted key:", key);

    // Try exact match first
    if (audioMap[key]) {
      console.log("Found audio source with key:", key);
      return audioMap[key];
    }

    // Try to match folder name (second last part)
    if (parts.length >= 2) {
      const folderName = parts[parts.length - 2]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      console.log("Trying folder name:", folderName);
      if (audioMap[folderName]) {
        console.log("Found audio source with folder name:", folderName);
        return audioMap[folderName];
      }
    }

    // Try partial matching - some keys in audioMap might not include artist name
    for (const mapKey in audioMap) {
      if (key.includes(mapKey) || mapKey.includes(key)) {
        console.log("Found audio source with partial match:", mapKey);
        return audioMap[mapKey];
      }
    }
  }

  console.warn("No audio source found for:", audioUrl);
  return null;
};
