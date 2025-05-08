const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER,
      user_id INTEGER,
      rating INTEGER,
      FOREIGN KEY(movie_id) REFERENCES movies(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  // Auto-migrate image_url column
  db.all("PRAGMA table_info(movies);", (err, columns) => {
    const hasImage = columns.some(col => col.name === "image_url");
    if (!hasImage) {
      console.log("🔧 Adding 'image_url' column to 'movies' table...");
      db.run("ALTER TABLE movies ADD COLUMN image_url TEXT;");
    }
  });
});

module.exports = db;