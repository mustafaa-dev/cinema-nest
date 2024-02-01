export const TMDB_API: string = 'https://api.themoviedb.org/3';

export const TMDB_CONNECTION_OPTIONS: object = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWE1Zjk0YmYzZmY2NzAwMDVhYTYwOWI1NzA0ZTM2ZiIsInN1YiI6IjVjZTg4MWU3OTI1MTQxNTQ1MGJjMGZkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3ST2dlJIHKX4B3-6HTLbP7oNISQ_SmvaXEBjUHNAtyo',
  },
};
