import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Movie {
  id: number;
  title: string;
  genre: string;
}

interface MovieCardProps {
  movie: Movie;
  index: number;
  scrollX: Animated.Value;
  snapInterval: number;
}

export default function MovieCard({
  movie,
  index,
  scrollX,
  snapInterval,
}: MovieCardProps) {
  const inputRange = [
    (index - 1) * snapInterval,
    index * snapInterval,
    (index + 1) * snapInterval,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const rotate = scrollX.interpolate({
    inputRange,
    outputRange: ["6deg", "0deg", "-6deg"],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.movieCard,
        { transform: [{ scale }, { rotate }], opacity },
      ]}
    >
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.posterContainer}>
          <View style={styles.posterPlaceholder}>
            <Text style={styles.posterText} numberOfLines={3}>
              {movie.title}
            </Text>
          </View>
        </View>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.movieGenre}>{movie.genre}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  movieCard: {
    width: 280,
    marginHorizontal: 8,
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  posterContainer: {
    width: "100%",
    height: 320,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#1f1f1f",
  },
  posterPlaceholder: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  posterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  movieInfo: {
    marginTop: 12,
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 4,
    textAlign: "center",
  },
  movieGenre: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "400",
    textAlign: "center",
  },
});
