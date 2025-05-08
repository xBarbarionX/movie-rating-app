const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to restrict to admin only
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}

// Get all users
router.get("/users", authenticateToken, requireAdmin, (req, res) => {
  db.all("SELECT id, username, role FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update user role
router.patch("/users/:id/role", authenticateToken, requireAdmin, (req, res) => {
  const { role } = req.body;
  const id = req.params.id;
  db.run("UPDATE users SET role = ? WHERE id = ?", [role, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Delete a movie
router.delete("/movies/:id", authenticateToken, requireAdmin, (req, res) => {
  db.run("DELETE FROM movies WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;