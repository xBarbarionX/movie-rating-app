import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(5);

  const fetchMovie = async () => {
    const res = await axios.get(`/movies/${id}`);
    setMovie(res.data);
  };

  const fetchAverage = async () => {
    const res = await axios.get(`/ratings/${id}/average`);
    setAvgRating(res.data.average?.toFixed(1));
  };

  const handleRate = async () => {
    try {
      await axios.post(`/ratings/${id}`, { rating: parseInt(rating) });
      fetchAverage();
    } catch {
      alert("Login required to rate");
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchAverage();
  }, [id]);

  if (!movie) return <p className="text-center mt-10 text-gray-500">Loading movie...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <img
        src={movie.image_url ? `http://localhost:4000${movie.image_url}` : `https://picsum.photos/seed/${movie.id}/600/300`}
        alt={movie.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{movie.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{movie.description}</p>
      <p className="text-sm text-gray-500 mb-4">⭐ Average Rating: {avgRating}</p>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max="10"
          className="border p-1 w-20 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button
          onClick={handleRate}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Rate
        </button>
      </div>
    </div>
  );
}