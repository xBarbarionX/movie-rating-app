import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const fetchMovies = async () => {
    const res = await axios.get("/movies");
    setMovies(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/admin/users");
    setUsers(res.data);
  };

  const handleAddMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      if (image) formData.append("image", image);

      await axios.post("/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle(""); setDesc(""); setImage(null);
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add movie");
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;
    await axios.delete(`/admin/movies/${id}`);
    fetchMovies();
  };

  const handleRoleChange = async (id, newRole) => {
    await axios.patch(`/admin/users/${id}/role`, { role: newRole });
    fetchUsers();
  };

  useEffect(() => {
    fetchMovies();
    fetchUsers();
  }, []);

  return (
    <div className="space-y-10 p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">🎬 Movie Management</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((m) => (
          <div key={m.id} className="bg-white dark:bg-gray-800 rounded shadow p-3">
            <img
              src={m.image_url ? `http://localhost:4000${m.image_url}` : `https://picsum.photos/seed/${m.id}/600/300`}
              alt={m.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-bold mt-2">{m.title}</h3>
            <p className="text-sm">{m.description}</p>
            <button
              onClick={() => handleDeleteMovie(m.id)}
              className="mt-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Add New Movie</h3>
        <div className="flex flex-col gap-2">
          <input className="border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input className="border p-2 rounded" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
          <input className="border p-2 rounded" type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-fit" onClick={handleAddMovie}>Add Movie</button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">👥 User Role Management</h2>
        <table className="w-full mt-4 border text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Username</th>
              <th className="p-2">Current Role</th>
              <th className="p-2">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
