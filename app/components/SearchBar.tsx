import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search movie, cinema, genre...",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      onSearch?.(text);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch?.("");
  }, [onSearch]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          isFocused
            ? ["#4A4A4A", "#3A3A3A", "#2A2A2A"]
            : ["#3A3A3A", "#2A2A2A", "#1A1A1A"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.searchBar, isFocused && styles.searchBarFocused]}
      >
        <Ionicons
          name="search-outline"
          size={28}
          color={isFocused ? "#FF9500" : "#fff"}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
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
  searchBarFocused: {
    borderColor: "#FF9500",
    borderWidth: 2,
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
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
});
