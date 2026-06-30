import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Mock "database" of users ---
// No real DB needed per the assignment — static/mock credentials only.
const MOCK_USERS = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "test1234" },
];

// Simple in-memory request log (helpful for debugging during dev)
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }

  // In a real app you'd issue a JWT/session here.
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: { email: user.email },
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Try logging in with: demo@example.com / password123`);
});
