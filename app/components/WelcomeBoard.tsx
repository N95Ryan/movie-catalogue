import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function WelcomeBoard() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeMessage}>Welcome N95Ryan 👋</Text>
        </View>
        <Text style={styles.subtitle}>Let&apos;s relax and watch a movie.</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/52971403?v=4",
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
    paddingTop: 8,
    marginHorizontal: 16,
    marginVertical: 12,
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
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
    marginRight: 8,
  },
  waveEmoji: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "400",
    lineHeight: 32,
  },
  profileSection: {
    marginLeft: 16,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});
