const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
require('dotenv').config();

// Middleware: CORS
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  /\.vercel\.app$/          // Allow all Vercel preview URLs
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);

    if(
      allowedOrigins.some(o => {
        if (o instanceof RegExp) return o.test(origin);
        return o === origin;
      })
    ){
      callback(null, true);
    } 
    else{
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));

// Middleware to parse JSON and URL-encoded data
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



