import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Profile() {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    axios.get("/ratings/user")
      .then(res => setRatedMovies(res.data))
      .catch(() => alert("You must be logged in to view your profile."));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Rated Movies</h2>
      {ratedMovies.length === 0 ? (
        <p className="text-gray-600">You haven't rated any movies yet.</p>
      ) : (
        <ul className="space-y-4">
          {ratedMovies.map((movie, i) => (
            <li key={i} className="border p-4 rounded">
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-700">{movie.description}</p>
              <p className="mt-1 text-yellow-600 font-medium">Your Rating: {movie.rating}/10</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}