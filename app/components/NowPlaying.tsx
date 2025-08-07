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
}

interface NowPlayingProps {
  movies?: Movie[];
}

const defaultMovies: Movie[] = [
  { id: 1, title: "Spider-Man No Way Home", genre: "Adventure" },
  { id: 2, title: "GOL", genre: "Action" },
  { id: 3, title: "The Matrix Resurrections", genre: "Sci-Fi" },
  { id: 4, title: "Dune", genre: "Adventure" },
  { id: 5, title: "No Time to Die", genre: "Action" },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 280;
const CARD_SPACING = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function NowPlaying({
  movies = defaultMovies,
}: NowPlayingProps) {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const movieCount = movies.length;

  const renderMovieCard = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard
      movie={item}
      index={index}
      scrollX={scrollX}
      snapInterval={SNAP_INTERVAL}
    />
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {movies.map((_, index) => (
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
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(
            event: NativeSyntheticEvent<NativeScrollEvent>
          ) => {
            let offsetX = event.nativeEvent.contentOffset.x;
            let index = Math.round(offsetX / SNAP_INTERVAL);

            if (index >= movieCount) {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: false,
              });
              setActiveIndex(0);
            } else if (index < 0) {
              const lastOffset = (movieCount - 1) * SNAP_INTERVAL;
              flatListRef.current?.scrollToOffset({
                offset: lastOffset,
                animated: false,
              });
              setActiveIndex(movieCount - 1);
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
    paddingHorizontal: 36, // 20 + 16 pour l'alignement
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
    height: 450,
    justifyContent: "center",
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
