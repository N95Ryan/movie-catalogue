import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ImageProps, StyleSheet, View } from "react-native";

type BackgroundPosterProps = {
  uri: string;
  height?: number;
  imageProps?: Partial<ImageProps>;
};

/**
 * Full-bleed poster background with a top-to-bottom gradient overlay for readability.
 */
export default function BackgroundPoster({
  uri,
  height = 420,
  imageProps,
}: BackgroundPosterProps) {
  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
        {...imageProps}
      />
      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.25)",
          "rgba(0,0,0,0.55)",
          "#0E0E0E",
          "#0E0E0E",
        ]}
        locations={[0, 0.35, 0.7, 0.85, 1]}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
