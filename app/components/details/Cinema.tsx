import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CinemaItem, colors } from "./theme";

type CinemaProps = {
  items: CinemaItem[];
};

export default function Cinema({ items }: CinemaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cinema</Text>
      <View style={styles.list}>
        {items.map((c) => (
          <View
            key={c.id}
            style={[styles.item, c.highlighted && styles.itemHighlighted]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.cinemaName}>{c.name}</Text>
              <Text style={styles.cinemaMeta} numberOfLines={1}>
                {c.distanceKm.toFixed(2)} Km | {c.address}
              </Text>
            </View>
            {c.brandBadge ? (
              <View
                style={[
                  styles.badge,
                  c.badgeColor && { backgroundColor: c.badgeColor },
                ]}
              >
                <Text style={styles.badgeText}>{c.brandBadge}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 26,
    marginBottom: 40,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 12,
  },
  list: {
    gap: 14,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.stroke,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  itemHighlighted: {
    borderColor: colors.accent,
    borderWidth: 2,
    shadowOpacity: 0.35,
    elevation: 4,
  },
  cinemaName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
  },
  cinemaMeta: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  badge: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 12,
  },
  badgeText: {
    color: colors.textPrimary,
    fontWeight: "400",
    fontSize: 12,
  },
  bookCta: {
    backgroundColor: colors.accent,
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 14,
  },
  bookText: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 18,
  },
});
