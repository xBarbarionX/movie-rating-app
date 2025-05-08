const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/admin", require("./routes/admin")); // ✅ NEW

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});