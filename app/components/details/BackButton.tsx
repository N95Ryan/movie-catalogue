import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors, radius } from "./theme";

type BackButtonProps = {
  style?: ViewStyle;
  onPress?: () => void;
};

/**
 * Floating back button over the poster.
 */
export default function BackButton({ style, onPress }: BackButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      accessibilityLabel="Go back"
      accessibilityRole="button"
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      onPress={
        onPress ??
        (() => (router.canGoBack() ? router.back() : router.replace("/")))
      }
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "rgba(0,0,0,0.25)" },
        ]}
      />
      <Feather name="chevron-left" color={colors.textPrimary} size={28} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
