import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function WelcomeBoard() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeMessage}>Welcome Ryan</Text>
          <Text style={styles.waveEmoji}>👋</Text>
        </View>
        <Text style={styles.subtitle}>Let&apos;s relax and watch a movie.</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  welcomeMessage: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "400",
    marginRight: 8,
  },
  waveEmoji: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    lineHeight: 32,
  },
  profileSection: {
    marginLeft: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3A3A3A",
  },
});
