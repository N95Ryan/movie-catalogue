import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./theme";

type SynopsisProps = {
  text: string;
};

export default function Synopsis({ text }: SynopsisProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Synopsis</Text>
      <Text
        style={styles.body}
        numberOfLines={expanded ? 0 : 2}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
      {expanded ? (
        <Text style={styles.readMore} onPress={() => setExpanded(false)}>
          Read Less
        </Text>
      ) : (
        <Text style={styles.readMore} onPress={() => setExpanded(true)}>
          Read More
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 8,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  readMore: {
    color: colors.accent,
    fontWeight: "700",
    marginTop: 6,
  },
});
