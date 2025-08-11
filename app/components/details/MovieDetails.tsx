import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie, colors, radius, spacing, typography } from "./theme";

type MovieDetailsProps = {
  movie: Movie;
};

/**
 * Dark card that overlays the poster's bottom area, showing title, meta, director and a CTA button.
 */
export default function MovieDetails({ movie }: MovieDetailsProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <LinearGradient
      colors={["#3A3A3A", "#2A2A2A", "#1A1A1A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.wrapper}
    >
      <View style={styles.rowBetween}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.8}
          onPress={() => setIsSaved((prev) => !prev)}
        >
          <Ionicons
            name="bookmark"
            size={28}
            color={isSaved ? colors.accent : colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{movie.year}</Text>
        <View style={styles.dot} />
        <Text style={styles.metaText}>{movie.genres.join(", ")}</Text>
        <View style={styles.dot} />
        <Text style={styles.metaText}>{movie.duration}</Text>
      </View>

      <View style={styles.directorRow}>
        <View style={styles.directorInfo}>
          <Image
            source={{ uri: movie.director.avatarUrl }}
            style={styles.directorAvatar}
          />
          <View>
            <Text style={styles.directorLabel}>Director</Text>
            <Text style={styles.directorName}>{movie.director.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.trailerBtn} activeOpacity={0.9}>
          <Ionicons name="play" size={16} color={colors.textPrimary} />
          <Text style={styles.trailerText}>Watch trailer</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxl,
    marginHorizontal: 24,
    marginTop: -250,
    overflow: "hidden",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.m,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "500",
  },
  saveBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 8,
  },
  directorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    gap: spacing.xs,
  },
  directorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexShrink: 1,
  },
  directorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  directorLabel: {
    color: colors.textSecondary,
    fontSize: typography.small,
    marginBottom: 2,
  },
  directorName: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "700",
  },
  trailerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: spacing.s,
  },
  trailerText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "400",
  },
});
