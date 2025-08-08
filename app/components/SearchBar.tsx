import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#3A3A3A", "#2A2A2A", "#1A1A1A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.searchBar}
      >
        <Ionicons
          name="search-outline"
          size={28}
          color="#fff"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search movie, cinema, genre..."
          placeholderTextColor="#9CA3AF"
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 36,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});
