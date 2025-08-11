import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ComingSoon from "./components/ComingSoon";
import NowPlaying from "./components/NowPlaying";
import SearchBar from "./components/SearchBar";
import WelcomeBoard from "./components/WelcomeBoard";
import {
  TmdbMovieListItem,
  buildImageUrl,
  getGenresMap,
  getPopularMovies,
} from "./services/tmdb";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popular, setPopular] = useState<TmdbMovieListItem[]>([]);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [movies, genres] = await Promise.all([
          getPopularMovies(),
          getGenresMap(),
        ]);
        if (!cancelled) {
          setPopular(movies);
          setGenreMap(genres);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Une erreur est survenue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // NowPlaying se charge lui-même depuis l'API

  const comingSoonData = useMemo(() => {
    return popular.slice(10, 20).map((m) => ({
      id: m.id,
      title: m.title,
      year: m.release_date ? Number(m.release_date.slice(0, 4)) : 0,
      genres: (m.genre_ids || [])
        .map((id: number) => genreMap[id])
        .filter(Boolean)
        .join(", "),
      posterUrl: buildImageUrl(m.poster_path, "w185"),
      rating: m.vote_average,
    }));
  }, [popular, genreMap]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeBoard />
        <SearchBar />
        {error ? (
          <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
            <Text style={{ color: "#FF6B6B" }}>
              Erreur de chargement TMDB. Vérifiez votre clé
              EXPO_PUBLIC_TMDB_API_KEY.
            </Text>
          </View>
        ) : null}
        {loading ? (
          <View style={[styles.center, { paddingVertical: 24 }]}>
            <ActivityIndicator size="large" color="#FF9500" />
          </View>
        ) : null}
        <NowPlaying
          onMoviePress={(m) =>
            router.push({
              pathname: "/movie/[id]",
              params: { id: String(m.id) },
            })
          }
        />
        <ComingSoon movies={comingSoonData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
