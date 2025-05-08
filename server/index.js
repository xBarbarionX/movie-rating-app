const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/admin", require("./routes/admin"));

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
  seedTestUsers();
});

// Auto-create test users
function seedTestUsers() {
  const users = [
    { username: "admin", password: "admin", role: "admin" },
    { username: "test", password: "test", role: "user" },
  ];

  users.forEach(({ username, password, role }) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
      if (err) return console.error(err.message);
      if (!row) {
        const hashed = await bcrypt.hash(password, 10);
        db.run(
          "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
          [username, hashed, role],
          (err) => {
            if (err) return console.error("Failed to insert", username, err.message);
            console.log(`✅ Seeded user: ${username}`);
          }
        );
      } else {
        console.log(`ℹ️ User '${username}' already exists`);
      }
    });
  });
}