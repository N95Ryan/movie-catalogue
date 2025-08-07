import React, { useState } from "react";
import {
  FlatList,
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

interface NowPlayingProps {
  movies?: Movie[];
}

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Spider-Man No Way Home",
    genre: "Adventure",
  },
  {
    id: 2,
    title: "GOL",
    genre: "Action",
  },
  {
    id: 3,
    title: "The Matrix Resurrections",
    genre: "Sci-Fi",
  },
  {
    id: 4,
    title: "Dune",
    genre: "Adventure",
  },
  {
    id: 5,
    title: "No Time to Die",
    genre: "Action",
  },
];

export default function NowPlaying({
  movies = defaultMovies,
}: NowPlayingProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieCard}>
      <View style={styles.posterContainer}>
        <View style={styles.posterPlaceholder}>
          <Text style={styles.posterText}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.movieGenre}>{item.genre}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {movies.slice(0, 5).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Now Playing</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / 280);
          setActiveIndex(index);
        }}
      />

      {renderPaginationDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  seeAllText: {
    fontSize: 14,
    color: "#FF9500",
    fontWeight: "600",
  },
  carousel: {
    paddingHorizontal: 20,
  },
  movieCard: {
    width: 280,
    marginRight: 16,
  },
  posterContainer: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
  },
  posterPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  posterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  movieInfo: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  movieGenre: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3A3A3A",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FF9500",
  },
});
