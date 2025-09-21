# Assessment Management System

A full-stack web application for managing health assessments and generating PDF reports. The system consists of a React frontend deployed on Vercel and a Node.js/Express backend deployed on Render.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Session Management**: Track and manage assessment sessions
- **PDF Report Generation**: Generate and download PDF reports using Puppeteer
- **Real-time Dashboard**: View system statistics and available sessions
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│   Vercel        │    │   Render        │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
assessment-management-system/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API service files
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   └── styles/          # CSS and styling
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vercel.json          # Vercel deployment config
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic services
│   │   ├── templates/       # PDF templates
│   │   └── utils/           # Utility functions
│   ├── package.json         # Backend dependencies
│   └── render.yaml          # Render deployment config
└── README.md                # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - UI framework
- **React Router DOM 7.9.1** - Client-side routing
- **Axios 1.12.2** - HTTP client
- **Tailwind CSS 3.4.17** - CSS framework
- **React Icons 5.5.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **Mongoose 7.8.7** - MongoDB ODM
- **Puppeteer 24.22.0** - PDF generation
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud database service

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

## 🔧 Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB Atlas account

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd assessment-management-system/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/assessment_db
   JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   NODE_ENV=development
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd assessment-management-system/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start development server:**
   ```bash
   npm start
   ```

## 🚀 Production Deployment

### Backend Deployment (Render)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Set build command: `npm install`
   - Set start command: `npm start`

2. **Configure environment variables in Render:**
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/assessment_db
   JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```

3. **Deploy and note the backend URL** (e.g., `https://your-backend-app.onrender.com`)

### Frontend Deployment (Vercel)

1. **Create a new project on Vercel:**
   - Connect your GitHub repository
   - Select the `frontend` folder as the root directory
   - Framework preset: Create React App

2. **Configure environment variables in Vercel:**
   ```
   REACT_APP_API_URL=https://your-backend-app.onrender.com/api
   ```

3. **Deploy the frontend**

4. **Update backend environment variable:**
   - Go back to Render and update `FRONTEND_URL` with your Vercel app URL

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | `your_super_secure_jwt_secret_key` |
| `FRONTEND_URL` | Frontend application URL | `https://your-app.vercel.app` |
| `PORT` | Server port (auto-set by Render) | `5000` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL with /api suffix | `https://your-backend.onrender.com/api` |

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sessions
- `GET /api/sessions/sessions` - Get all available sessions

### Reports
- `POST /api/report/generate-report` - Generate PDF report
- `GET /api/report/download/:session_id` - Download PDF report

## 🛡️ Security Features

### CORS Configuration
- **Local Development**: `http://localhost:3000`, `http://127.0.0.1:3000`
- **Production**: Custom frontend URL + Vercel patterns (`*.vercel.app`, `*.vercel.dev`)
- **Credentials**: Enabled for authenticated requests
- **Methods**: GET, POST, PUT, DELETE, OPTIONS, PATCH
- **Headers**: Comprehensive header support

### Authentication
- JWT-based authentication
- Automatic token expiration handling
- Secure password hashing with bcryptjs
- Input validation and sanitization

### Error Handling
- Comprehensive error logging
- User-friendly error messages
- Automatic logout on authentication failure
- Request timeout handling

## 📊 Production Optimizations

### Backend Optimizations
- **Connection Pooling**: MongoDB connection pooling (max 10 connections)
- **Request Timeouts**: 5-second server selection timeout
- **Socket Timeouts**: 45-second socket timeout
- **Memory Limits**: 10MB request size limit
- **Graceful Shutdown**: Proper MongoDB connection cleanup

### Frontend Optimizations
- **Axios Configuration**: Request/response interceptors
- **Timeout Handling**: 10s for auth, 30s for reports, 60s for downloads
- **Error Recovery**: Automatic redirect on authentication failure
- **Request Logging**: Development request logging

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify `FRONTEND_URL` is set correctly in backend
   - Check that `REACT_APP_API_URL` includes `/api` suffix
   - Ensure both URLs use HTTPS in production

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas
   - Ensure IP whitelist includes Render's IPs

3. **PDF Generation Issues**
   - Verify Puppeteer has sufficient memory allocation
   - Check file system permissions for PDF storage
   - Monitor Render logs for Puppeteer errors

4. **Authentication Issues**
   - Verify JWT_SECRET is set and consistent
   - Check token expiration settings
   - Clear browser localStorage if needed

### Debug Mode
Enable debug logging by checking browser console and Render logs for detailed error information.

## 📝 Recent Updates

### Deployment-Ready Enhancements
- ✅ **Enhanced CORS Configuration**: Support for all Vercel deployment patterns
- ✅ **Production Database Setup**: Connection pooling and timeout configurations
- ✅ **Error Handling**: Comprehensive error logging and user feedback
- ✅ **Security**: Input validation and secure headers
- ✅ **Performance**: Request timeouts and memory optimization
- ✅ **Monitoring**: Health check endpoints and logging
- ✅ **Deployment Configs**: Vercel and Render configuration files

### API Improvements
- ✅ **Axios Interceptors**: Automatic error handling and logging
- ✅ **Request Validation**: Input sanitization and validation
- ✅ **File Downloads**: Enhanced PDF download with proper headers
- ✅ **Authentication Flow**: Automatic logout on token expiration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



