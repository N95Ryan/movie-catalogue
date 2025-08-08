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
  body: 16,
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
  brandBadge?: string; // text badge at the right side
  badgeColor?: string; // optional custom color for badge background
  highlighted?: boolean;
};

export type Movie = {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  genres: string[];
  duration: string; // e.g. "2h 28m"
  rating: number;
  director: Director;
  synopsis: string;
  cast: Actor[];
  cinemas: CinemaItem[];
};

export const mockMovie: Movie = {
  id: 3,
  title: "Spider-Man No Way Home",
  posterUrl: "https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  year: 2021,
  genres: ["Adventure", "Action"],
  duration: "2 j 28 m",
  rating: 8.5,
  director: {
    name: "Jon Watts",
    avatarUrl:
      "https://image.tmdb.org/t/p/w185/9gbvlGJ8d0B4iZVAnbGJ5xTKtyP.jpg",
  },
  synopsis:
    "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
  cast: [
    {
      id: 1,
      name: "Tom Holland",
      avatarUrl:
        "https://image.tmdb.org/t/p/w185/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg",
    },
    {
      id: 2,
      name: "Tobey Maguire",
      avatarUrl:
        "https://image.tmdb.org/t/p/w185/hTZn9r7Qy1w1YyYx6a5jU1dZCvG.jpg",
    },
    {
      id: 3,
      name: "Andrew Garfield",
      avatarUrl:
        "https://image.tmdb.org/t/p/w185/5a9c4u1r5MMd3Y6UytzszgdWzxK.jpg",
    },
  ],
  cinemas: [
    {
      id: 1,
      name: "HARTONO MALL CGV",
      distanceKm: 4.53,
      address: "Jl. Ring Road Utara, Kaliw...",
      brandBadge: "CGV",
      badgeColor: "#E53935",
      highlighted: true,
    },
    {
      id: 2,
      name: "LIPPO PLAZA JOGJA CINEPOLIS",
      distanceKm: 6.1,
      address: "Jl. Laksda Adisucipto No.32...",
      brandBadge: "cinepolis",
      badgeColor: "#3B82F6",
    },
  ],
};


