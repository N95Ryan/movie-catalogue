import React, { useCallback, useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { colors } from "../theme";

type SynopsisProps = {
  text: string;
};

export default function Synopsis({ text }: SynopsisProps) {
  const [expanded, setExpanded] = useState(false);

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);

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
        <Text style={styles.readMore} onPress={toggleExpanded}>
          Read Less
        </Text>
      ) : (
        <Text style={styles.readMore} onPress={toggleExpanded}>
          Read More
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "600",
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
    alignSelf: "flex-end", // position the toggle at the right side of the synopsis
  },
});
