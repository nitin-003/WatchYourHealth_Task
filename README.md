# Assessment Management System

A comprehensive web application for managing health assessments and generating PDF reports with a configuration-driven approach.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **PDF Report Generation**: Dynamic PDF generation with Puppeteer
- **Configuration-Driven**: Add new assessment types without code changes
- **Modern UI**: Beautiful React frontend with Tailwind CSS
- **Flexible Data Mapping**: JSON path-based field extraction
- **Classification System**: Configurable health metric ranges

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd assessment-management-system/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   ```bash
   # Copy the environment template
   cp config.env .env
   
   # Edit .env with your configuration:
   MONGO_URI=mongodb://localhost:27017/assessment_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running on your system
   # For local development, you can use MongoDB Compass or command line
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd assessment-management-system/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## 🎯 Usage

### 1. User Registration & Login
- Visit `http://localhost:3000`
- Create a new account or login with existing credentials
- Access the dashboard after authentication

### 2. Generate Reports
- Navigate to the "Reports" section
- Enter a session ID (e.g., `session_001` or `session_002`)
- Click "Generate Report" to create a PDF
- Download the generated PDF file

### 3. Available Sessions
- `session_001`: Health & Fitness Assessment (`as_hr_02`)
- `session_002`: Cardiac Assessment (`as_card_01`)

## ⚙️ Configuration System

### Adding New Assessment Types

1. **Update Data Structure:**
   Add new session data to `backend/src/data/data.js`

2. **Configure Assessment:**
   Add configuration to `backend/src/config/assessmentConfig.js`:
   ```javascript
   new_assessment_id: {
     sections: [
       {
         title: 'Section Name',
         fields: [
           { label: 'Field Label', path: 'data.path.to.field', unit: 'unit' }
         ]
       }
     ],
     classification: {
       'data.path.to.field': [
         { min: 0, max: 10, level: 'Low' },
         { min: 11, max: 20, level: 'Normal' },
         { min: 21, max: Infinity, level: 'High' }
       ]
     }
   }
   ```

3. **Add Classification Ranges:**
   Update `backend/src/config/classificationRanges.js` if needed

### Field Path Examples

- `vitalsMap.vitals.heart_rate` - Heart rate from vitals
- `bodyCompositionData.BMI` - BMI from body composition
- `exercises[0].setList[0].time` - Time from first exercise's first set
- `accuracy` - Overall assessment accuracy

## 📁 Project Structure

```
assessment-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── data/           # Sample data
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── templates/      # HTML templates
│   │   ├── utils/          # Utility functions
│   │   └── reports/        # Generated PDFs
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API calls
│   │   ├── context/       # React context
│   │   └── styles/        # CSS styles
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Reports
- `POST /api/report/generate-report` - Generate PDF report
- `GET /api/report/download/:session_id` - Download PDF

### Sessions
- `GET /api/sessions/sessions` - Get available sessions

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Modern Interface**: Clean, professional design
- **Interactive Elements**: Hover effects, animations
- **User Feedback**: Loading states, error messages
- **Dashboard**: Quick access to main features

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify database permissions

2. **PDF Generation Fails:**
   - Check if Puppeteer dependencies are installed
   - Verify template files exist
   - Check file system permissions

3. **Frontend Build Errors:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Environment Variables

Make sure all required environment variables are set:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Backend server port
- `FRONTEND_URL`: Frontend URL for CORS

## 📝 Development Notes

- The system uses Handlebars for HTML templating
- PDFs are generated using Puppeteer
- Authentication uses JWT tokens
- Data is stored in MongoDB
- Frontend uses React with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please create an issue in the repository or contact the development team.


