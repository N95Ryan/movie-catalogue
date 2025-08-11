import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./components/Screen-2/BackButton";
import BackgroundPoster from "./components/Screen-2/BackgroundPoster";
import Cast from "./components/Screen-2/Cast";
import Cinema from "./components/Screen-2/Cinema";
import MovieDetails from "./components/Screen-2/MovieDetails";
import Synopsis from "./components/Screen-2/Synopsis";
import { Movie } from "./components/theme";
import { buildImageUrl, getMovieDetailsWithCredits } from "./services/tmdb";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Number(id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        if (!movieId || Number.isNaN(movieId))
          throw new Error("ID de film invalide");
        const { details, credits } = await getMovieDetailsWithCredits(movieId);
        // Find director in crew
        const director = credits.crew.find(
          (c: { job: string }) => c.job === "Director"
        );
        const cast = credits.cast
          .slice(0, 10)
          .map(
            (c: {
              id: number;
              name: string;
              profile_path?: string | null;
            }) => ({
              id: c.id,
              name: c.name,
              avatarUrl:
                buildImageUrl(c.profile_path, "w185") ||
                "https://via.placeholder.com/80x80.png?text=Actor",
            })
          );

        const mapped: Movie = {
          id: details.id,
          title: details.title,
          posterUrl: buildImageUrl(details.poster_path, "w780") || "",
          year: details.release_date
            ? Number(details.release_date.slice(0, 4))
            : 0,
          genres: (details.genres || []).map((g: { name: string }) => g.name),
          duration: details.runtime
            ? `${Math.floor(details.runtime / 60)} h ${details.runtime % 60} m`
            : "",
          rating: details.vote_average,
          director: {
            name: director?.name || "",
            avatarUrl: director?.profile_path
              ? buildImageUrl(director.profile_path, "w185")!
              : "https://via.placeholder.com/80x80.png?text=Dir",
          },
          synopsis: details.overview,
          cast,
          // Keep local mock cinemas for design consistency
          cinemas: [
            {
              id: 1,
              name: "HARTONO MALL CGV",
              distanceKm: 4.53,
              address: "Jl. Ring Road Utara, Kaliw...",
              brandBadge: "CGV",
              badgeColor: "#E53935",
              highlighted: true,
            },
            {
              id: 2,
              name: "LIPPO PLAZA JOGJA CINEPOLIS",
              distanceKm: 6.1,
              address: "Jl. Laksda Adisucipto No.32...",
              brandBadge: "cinepolis",
              badgeColor: "#3B82F6",
            },
          ],
        };

        if (!cancelled) setMovie(mapped);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#131313" />
        <View style={[styles.loader]}>
          <ActivityIndicator size="large" color="#FF9500" />
        </View>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#131313" />
      </View>
    );
  }

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
        <View style={styles.contentSolidBackground}>
          <Synopsis text={movie.synopsis} />
          <Cast cast={movie.cast} />
          <Cinema items={movie.cinemas} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAbsolute: {
    position: "absolute",
    top: 44,
    left: 24,
    zIndex: 4,
    elevation: 4,
  },
  contentSolidBackground: {
    backgroundColor: "#131313",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 24,
  },
});
