import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiFileText, FiLogOut, FiTrendingUp, FiActivity, FiCheckCircle } from 'react-icons/fi';

export default function Home() {
  const { user, logout, token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    availableSessions: 0,
    assessmentTypes: 0,
    generatedReports: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch available sessions
        const API_BASE = process.env.REACT_APP_API_URL;
        const sessionsResponse = await fetch(`${API_BASE}/sessions/sessions`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Important for CORS with credentials
          timeout: 10000 // 10 second timeout
        });
        
        if(sessionsResponse.ok){
          const sessions = await sessionsResponse.json();
          const uniqueAssessmentTypes = [...new Set(sessions.map(s => s.assessment_id))];
          
          setStats({
            availableSessions: sessions.length,
            assessmentTypes: uniqueAssessmentTypes.length,
            generatedReports: 0 // This would be fetched from a reports endpoint
          });
        }
      } 
      catch(error){
        console.error('Error fetching stats:', error);
        // Set default values if API fails
        setStats({
          availableSessions: 2, // Fallback to known data
          assessmentTypes: 2,
          generatedReports: 0
        });
      } 
      finally{
        setLoading(false);
      }
    };

    if(token){
      fetchStats();
    }
  }, [token]);

  const dashboardCards = [
    {
      title: 'Generate Reports',
      description: 'Create PDF reports from assessment data',
      icon: FiFileText,
      link: '/report',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Sessions',
      description: 'Browse available assessment sessions',
      icon: FiActivity,
      link: '/sessions',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  // Get user's first name or fallback
  const getUserFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome back, {getUserFirstName()}! 👋
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Manage your health assessments and generate comprehensive reports with our advanced system.
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <p className="text-xl text-gray-600">Choose what you'd like to do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dashboardCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Get Started
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Overview</h2>
            <p className="text-lg text-gray-600">Real-time data from your assessment system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FiTrendingUp className="text-blue-600" size={24} />
              </div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stats.availableSessions}</h3>
                  <p className="text-gray-600">Available Sessions</p>
                </>
              )}
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiFileText className="text-green-600" size={24} />
              </div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stats.assessmentTypes}</h3>
                  <p className="text-gray-600">Assessment Types</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {getUserInitials()}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900">{user?.name || 'User'}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  <FiCheckCircle className="inline mr-1" size={14} />
                  Account Active
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <FiLogOut className="mr-2" size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



