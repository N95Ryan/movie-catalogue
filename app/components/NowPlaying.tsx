import React, { useRef, useState } from "react";
import {
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
  movies?: Movie[];
  onMoviePress?: (movie: Movie) => void;
}

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "The Matrix Resurrections",
    genre: "Sci-Fi",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 8.2,
    year: 2021,
  },
  {
    id: 2,
    title: "GOL",
    genre: "Action",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
    rating: 7.8,
    year: 2022,
  },
  {
    id: 3,
    title: "Spider-Man No Way Home",
    genre: "Adventure",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    rating: 8.5,
    year: 2021,
  },
  {
    id: 4,
    title: "Dune",
    genre: "Adventure",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    rating: 8.0,
    year: 2021,
  },
  {
    id: 5,
    title: "No Time to Die",
    genre: "Action",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
    rating: 7.3,
    year: 2021,
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 280;
const CARD_SPACING = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function NowPlaying({
  movies = defaultMovies,
  onMoviePress,
}: NowPlayingProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
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
