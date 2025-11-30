import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock Data
let users = [
  { id: 1, email: "user@example.com", password: "password", name: "Demo User" },
];
let notes = [
  { id: "1", title: "Welcome Note", content: "This is your first note." },
  {
    id: "2",
    title: "React Router",
    content: "Learning about loaders and actions.",
  },
];

let currentUser = null;

// Auth Middleware
const requireAuth = (req, res, next) => {
  if (!currentUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Routes
app.get("/api/me", (req, res) => {
  if (!currentUser) return res.status(401).json(null);
  res.json(currentUser);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    currentUser = { id: user.id, email: user.email, name: user.name };
    res.json(currentUser);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/logout", (req, res) => {
  currentUser = null;
  res.json({ success: true });
});

app.get("/api/notes", requireAuth, (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", requireAuth, (req, res) => {
  const note = notes.find((n) => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Please stop the other process running on this port.`
    );
  } else {
    console.error("Server error:", e);
  }
});
