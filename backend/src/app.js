const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
require('dotenv').config();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",   // Local React app
  "http://127.0.0.1:3000",   // In case of 127.0.0.1
  process.env.FRONTEND_URL,  // Deployed frontend (e.g., Vercel)
  /\.vercel\.app$/           // All Vercel preview URLs
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman / mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(o => (o instanceof RegExp ? o.test(origin) : o === origin))) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// JSON & URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

