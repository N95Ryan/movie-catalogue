import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Movie {
  id: number;
  title: string;
  year: number;
  genres: string;
  posterUrl?: string;
  rating?: number;
}

interface ComingSoonProps {
  movies?: Movie[];
}

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Peacemaker",
    year: 2022,
    genres: "Action, Adventure, Comedy",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/ctxm191q5o3axFzkgsvuxEpfV5u.jpg",
    rating: 8.1,
  },
  {
    id: 2,
    title: "The Batman",
    year: 2022,
    genres: "Action, Crime, Drama",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8,
  },
  {
    id: 3,
    title: "Doctor Strange 2",
    year: 2022,
    genres: "Action, Adventure, Fantasy",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9Gtg2DzBHFY2Y8Yo3L2qbvBw7Ul.jpg",
    rating: 7.3,
  },
];

export default function ComingSoon({
  movies = defaultMovies,
}: ComingSoonProps) {
  const renderMovieCard = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieCard} activeOpacity={0.8}>
      <View style={styles.thumbnailContainer}>
        {item.posterUrl ? (
          <Image
            source={{ uri: item.posterUrl }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Text style={styles.thumbnailText}>{item.title.split(" ")[0]}</Text>
          </View>
        )}
        {item.rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {item.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title} ({item.year})
        </Text>
        <Text style={styles.movieGenres}>{item.genres}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.moviesList}>
        {movies.map((movie) => (
          <View key={movie.id} style={styles.movieCardContainer}>
            {renderMovieCard({ item: movie })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 36,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  seeAllText: {
    fontSize: 14,
    color: "#FF9500",
    fontWeight: "600",
  },
  moviesList: {
    paddingHorizontal: 20,
  },
  movieCardContainer: {
    marginBottom: 12,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 12,
    width: "100%",
  },
  thumbnailContainer: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
    position: "relative",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  ratingBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  ratingText: {
    color: "#FF9500",
    fontSize: 10,
    fontWeight: "600",
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  movieGenres: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },
});
