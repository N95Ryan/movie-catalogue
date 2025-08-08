import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Actor, colors } from "./theme";

type CastProps = {
  cast: Actor[];
};

export default function Cast({ cast }: CastProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {cast.map((actor) => (
          <View key={actor.id} style={styles.card}>
            <Image source={{ uri: actor.avatarUrl }} style={styles.avatar} />
            <Text style={styles.name} numberOfLines={2}>
              {actor.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 22,
    marginBottom: 12,
  },
  row: {
    gap: 10,
  },
  card: {
    minWidth: 150,
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 8,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "left",
  },
});
