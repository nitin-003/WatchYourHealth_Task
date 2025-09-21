const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
require('dotenv').config();

// Production-ready CORS configuration
const allowedOrigins = [
  "http://localhost:3000",   // Local React app
  "http://127.0.0.1:3000",   // In case of 127.0.0.1
  process.env.FRONTEND_URL,  // Deployed frontend (e.g., Vercel)
  /\.vercel\.app$/,          // All Vercel preview URLs
  /\.vercel\.dev$/           // Vercel dev URLs
];

// Enhanced CORS middleware for production
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman / mobile apps)
    if (!origin) return callback(null, true);

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With", 
    "Content-Type", 
    "Accept", 
    "Authorization",
    "Cache-Control",
    "Pragma"
  ],
  exposedHeaders: ["Content-Disposition"],
  maxAge: 86400 // 24 hours
}));

// JSON & URL-encoded middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Assessment Management System API',
    version: '1.0.0',
    status: 'running',
    documentation: '/api/health'
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

