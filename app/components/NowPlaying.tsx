import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  posterUrl?: string;
  rating?: number;
  year?: number;
}

interface NowPlayingProps {
  movies?: Movie[]; // si fourni, on n'appelle pas l'API en interne
  onMoviePress?: (movie: Movie) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 280;
const CARD_SPACING = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function NowPlaying({
  movies: externalMovies,
  onMoviePress,
}: NowPlayingProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const [movies, setMovies] = useState<Movie[]>(externalMovies ?? []);
  const [loading, setLoading] = useState(!externalMovies);
  const [error, setError] = useState<string | null>(null);

  // Source de vérité: si des films sont fournis en props, on les utilise; sinon on tente un fetch minimal
  useEffect(() => {
    if (externalMovies && externalMovies.length > 0) {
      setMovies(externalMovies);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        if (!response.ok) throw new Error("TMDB non disponible");
        const data = await response.json();
        if (!Array.isArray(data.results)) throw new Error("Réponse inattendue");
        const formattedMovies: Movie[] = data.results
          .slice(0, 10)
          .map((item: any) => ({
            id: item.id,
            title: item.title,
            genre: "",
            posterUrl: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : undefined,
            rating: item.vote_average,
            year: item.release_date
              ? parseInt(String(item.release_date).slice(0, 4), 10)
              : undefined,
          }));
        if (!cancelled) setMovies(formattedMovies);
      } catch (err) {
        if (!cancelled) setError("Impossible de charger les films.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, [externalMovies]);

  const movieCount = movies.length;

  const navigateToIndex = (index: number) => {
    if (index >= 0 && index < movieCount) {
      const offset = index * SNAP_INTERVAL;
      flatListRef.current?.scrollToOffset({
        offset,
        animated: true,
      });
      setActiveIndex(index);
    }
  };

  const renderMovieCard = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard
      movie={item}
      index={index}
      scrollX={scrollX}
      snapInterval={SNAP_INTERVAL}
      onPress={onMoviePress}
    />
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {movies.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.paginationDot,
            index === activeIndex && styles.paginationDotActive,
            {
              transform: [
                {
                  scale: scrollX.interpolate({
                    inputRange: [
                      (index - 0.5) * SNAP_INTERVAL,
                      index * SNAP_INTERVAL,
                      (index + 0.5) * SNAP_INTERVAL,
                    ],
                    outputRange: [1, 1.1, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => navigateToIndex(index)}
          />
        </Animated.View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#FF9500"
        style={{ marginTop: 50 }}
      />
    );
  }

  if (error) {
    return (
      <View style={{ paddingHorizontal: 36, paddingVertical: 24 }}>
        <Text style={{ color: "#FF6B6B", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Now Playing</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
          }}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / SNAP_INTERVAL);
                if (index >= 0 && index < movieCount) {
                  setActiveIndex(index);
                }
              },
            }
          )}
          onMomentumScrollEnd={(
            event: NativeSyntheticEvent<NativeScrollEvent>
          ) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / SNAP_INTERVAL);

            if (index >= movieCount) {
              navigateToIndex(0);
            } else if (index < 0) {
              navigateToIndex(movieCount - 1);
            } else {
              setActiveIndex(index);
            }
          }}
        />
      </View>

      {renderPaginationDots()}
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
    fontSize: 22,
    fontWeight: "400",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: "#FF9500",
    fontWeight: "600",
  },
  carouselContainer: {
    height: 410,
    justifyContent: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    alignSelf: "center",
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3A3A3A",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDotActive: {
    backgroundColor: "#FF9500",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  paginationButton: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
