import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ComingSoon from "./components/ComingSoon";
import NowPlaying from "./components/NowPlaying";
import SearchBar from "./components/SearchBar";
import WelcomeBoard from "./components/WelcomeBoard";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeBoard />
        <SearchBar />
        <NowPlaying
          onMoviePress={(m) =>
            router.push({
              pathname: "/movie/[id]",
              params: { id: String(m.id) },
            })
          }
        />
        <ComingSoon />
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
});
