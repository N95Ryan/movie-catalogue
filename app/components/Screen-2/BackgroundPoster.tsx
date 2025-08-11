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
          "rgba(0,0,0,0.18)",
          "rgba(0,0,0,0.45)",
          "rgba(19,19,19,0.98)",
          "#131313",
        ]}
        locations={[0, 0.45, 0.8, 0.95, 1]}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
});
