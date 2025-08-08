import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./components/details/BackButton";
import BackgroundPoster from "./components/details/BackgroundPoster";
import Cast from "./components/details/Cast";
import Cinema from "./components/details/Cinema";
import MovieDetails from "./components/details/MovieDetails";
import Synopsis from "./components/details/Synopsis";
import { colors, mockMovie } from "./components/details/theme";

export default function MovieDetailScreen() {
  const movie = mockMovie;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View>
          <BackgroundPoster uri={movie.posterUrl} />
          <SafeAreaView style={styles.headerAbsolute}>
            <BackButton />
          </SafeAreaView>
        </View>
        <MovieDetails movie={movie} />
        <Synopsis text={movie.synopsis} />
        <Cast cast={movie.cast} />
        <Cinema items={movie.cinemas} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerAbsolute: {
    position: "absolute",
    top: 44,
    left: 24,
  },
});
