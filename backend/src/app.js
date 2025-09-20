const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

require('dotenv').config();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;


