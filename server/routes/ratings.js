const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Add or update rating
router.post("/:movieId", authenticateToken, (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.user.id;
  const { rating } = req.body;

  db.get(
    "SELECT * FROM ratings WHERE movie_id = ? AND user_id = ?",
    [movieId, userId],
    (err, row) => {
      if (row) {
        db.run(
          "UPDATE ratings SET rating = ? WHERE movie_id = ? AND user_id = ?",
          [rating, movieId, userId],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Rating updated" });
          }
        );
      } else {
        db.run(
          "INSERT INTO ratings (movie_id, user_id, rating) VALUES (?, ?, ?)",
          [movieId, userId, rating],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Rating added" });
          }
        );
      }
    }
  );
});

// Get average rating for a movie
router.get("/:movieId/average", (req, res) => {
  const movieId = req.params.movieId;

  db.get(
    "SELECT AVG(rating) as average FROM ratings WHERE movie_id = ?",
    [movieId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ average: row.average ?? 0 });
    }
  );
});

// Get all ratings by logged-in user
router.get("/user", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT m.title, m.description, r.rating
     FROM ratings r
     JOIN movies m ON r.movie_id = m.id
     WHERE r.user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;