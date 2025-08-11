export const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

export type TmdbMovieListItem = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  overview: string;
};

export type TmdbMovieListResponse = {
  page: number;
  results: TmdbMovieListItem[];
  total_pages: number;
  total_results: number;
};

export type TmdbGenre = { id: number; name: string };
export type TmdbGenreListResponse = { genres: TmdbGenre[] };

export function buildImageUrl(
  path?: string | null,
  size: "w185" | "w300" | "w500" | "w780" | "original" = "w500"
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;
}

export async function getPopularMovies(): Promise<TmdbMovieListItem[]> {
  if (!API_KEY) throw new Error("TMDB API key manquante (EXPO_PUBLIC_TMDB_API_KEY)");
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data: TmdbMovieListResponse = await res.json();
  return data.results;
}

export async function getGenresMap(): Promise<Record<number, string>> {
  if (!API_KEY) throw new Error("TMDB API key manquante (EXPO_PUBLIC_TMDB_API_KEY)");
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data: TmdbGenreListResponse = await res.json();
  const map: Record<number, string> = {};
  for (const g of data.genres) map[g.id] = g.name;
  return map;
}

export async function getMovieDetailsWithCredits(movieId: number) {
  const [detailsRes, creditsRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`),
  ]);

  if (!detailsRes.ok) throw new Error("Failed to fetch movie details");
  if (!creditsRes.ok) throw new Error("Failed to fetch credits");

  const details = await detailsRes.json();
  const credits = await creditsRes.json();

  return { details, credits };
}
