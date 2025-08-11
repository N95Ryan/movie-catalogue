export const colors = {
  background: "#1C1C1C",
    card: "#0E0E0E",
  textPrimary: "#FFFFFF",
  textSecondary: "#9CA3AF",
  accent: "#FF9500",
  stroke: "#2A2A2A",
  chip: "#2B2B2B",
};

export const spacing = {
  xs: 6,
  s: 8,
  sm: 10,
  m: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
};

export const typography = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 14,
  small: 12,
};

export type Director = {
  name: string;
  avatarUrl: string;
};

export type Actor = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type CinemaItem = {
  id: number;
  name: string;
  distanceKm: number;
  address: string;
  brandBadge?: string;
  badgeColor?: string;
  highlighted?: boolean;
};

export type Movie = {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  genres: string[];
  duration: string;
  rating: number;
  director: Director;
  synopsis: string;
  cast: Actor[];
  cinemas: CinemaItem[];
};

