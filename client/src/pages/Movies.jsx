import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { getUserFromToken } from '../utils/auth';
import { Link } from 'react-router-dom';

const BASE_URL = "http://localhost:4000";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const user = getUserFromToken();

  const fetchMovies = async () => {
    const res = await axios.get("/movies");
    setMovies(res.data);
  };

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          className="border p-2 rounded w-full sm:w-1/2"
          placeholder="Search movies by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    axios.get(`/ratings/${movie.id}/average`).then(res => {
      setAvg(res.data.average?.toFixed(1));
    });
  }, [movie.id]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
      <img
        src={movie.image_url ? `${BASE_URL}${movie.image_url}` : `https://picsum.photos/seed/${movie.id}/600/300`}
        alt="movie poster"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{movie.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{movie.description}</p>
        <p className="text-sm">⭐ Average Rating: {avg}</p>
      </div>
    </div>
  );
}