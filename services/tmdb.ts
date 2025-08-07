import { Movie } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface TMDBMovieResponse extends Movie {
  // Complete movie details may have additional properties
}

export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId: number): Promise<Movie> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBMovieResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<Movie[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

export async function fetchTopRatedMovies(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}

export async function fetchUpcomingMovies(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}

export async function fetchNowPlayingMovies(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}
