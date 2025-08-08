import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./theme";

type SynopsisProps = {
  text: string;
};

/**
 * Synopsis section with expandable text. Matches the design with a Read More link.
 */
export default function Synopsis({ text }: SynopsisProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Synopsis</Text>
      <Text style={styles.body} numberOfLines={expanded ? 0 : 2}>
        {text}
        {!expanded && ".. "}
        {!expanded && (
          <Text style={styles.readMore} onPress={() => setExpanded(true)}>
            Read More
          </Text>
        )}
      </Text>
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
    fontWeight: "800",
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
  },
});
