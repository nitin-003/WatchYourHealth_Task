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
- **React - UI framework
- **React Router DOM - Client-side routing
- **Axios - HTTP client
- **Tailwind CSS - CSS framework
- **React Icons - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express - Web framework
- **Mongoose - MongoDB ODM
- **Puppeteer - PDF generation
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud database service

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

## 🔧 Development Setup

### Prerequisites
- Node.js 
- npm 
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

5. **Start development server:**
   ```bash
   npm start
   ```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sessions
- `GET /api/sessions/sessions` - Get all available sessions

### Reports
- `POST /api/report/generate-report` - Generate PDF report
- `GET /api/report/download/:session_id` - Download PDF report
  
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


3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



