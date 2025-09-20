import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { generateReport, downloadReport } from '../api/report';
import { FiFileText, FiDownload, FiCheckCircle, FiAlertCircle, FiRefreshCw, FiCalendar, FiActivity } from 'react-icons/fi';

export default function ReportTest() {
  const { token } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableSessions] = useState([
    { session_id: 'session_001', assessment_id: 'as_hr_02', type: 'Health & Fitness Assessment' },
    { session_id: 'session_002', assessment_id: 'as_card_01', type: 'Cardiac Assessment' }
  ]);

  const validate = () => {
    const newErrors = {};
    if (!sessionId.trim()) newErrors.sessionId = 'Session ID is required';
    return newErrors;
  };

  const handleSessionIdChange = (e) => {
    setSessionId(e.target.value);
    setErrors({ ...errors, sessionId: null });
    setMessage('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setMessage('');
    try{
      await generateReport(sessionId, token);
      setMessage('Report generated successfully! You can now download the PDF.');
    } 
    catch(err){
      setMessage(err.response?.data?.msg || 'Failed to generate report.');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if(!sessionId.trim()){
      setErrors({ sessionId: 'Session ID is required for download' });
      return;
    }
    try{
      const res = await downloadReport(sessionId, token);
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Download started successfully!');
    } 
    catch{
      setMessage('Failed to download the report.');
    }
  };

  const selectSession = (session) => {
    setSessionId(session.session_id);
    setErrors({});
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white mb-6">
            <FiFileText size={28} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Generate Assessment Reports</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create comprehensive PDF reports from your health assessment data with our advanced reporting system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FiActivity className="mr-3 text-blue-600" size={24} />
                Report Generation
              </h2>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Session ID
                  </label>
                  <input
                    type="text"
                    value={sessionId}
                    onChange={handleSessionIdChange}
                    placeholder="Enter session_id (e.g., session_001)"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.sessionId ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {errors.sessionId && (
                    <p className="text-red-600 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="mr-1" size={16} />
                      {errors.sessionId}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <FiRefreshCw className="mr-2 animate-spin" size={18} />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiFileText className="mr-2" size={18} />
                        Generate Report
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                  >
                    <FiDownload className="mr-2" size={18} />
                    Download PDF
                  </button>
                </div>

                {message && (
                  <div className={`p-4 rounded-xl flex items-center ${
                    message.includes('successfully') || message.includes('started')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message.includes('successfully') || message.includes('started') ? (
                      <FiCheckCircle className="mr-2" size={20} />
                    ) : (
                      <FiAlertCircle className="mr-2" size={20} />
                    )}
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Available Sessions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FiCalendar className="mr-2 text-green-600" size={20} />
                Available Sessions
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Click on a session to auto-fill the form
              </p>
              
              <div className="space-y-4">
                {availableSessions.map((session, index) => (
                  <div
                    key={index}
                    onClick={() => selectSession(session)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      sessionId === session.session_id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{session.session_id}</h4>
                        <p className="text-sm text-gray-600 mt-1">{session.type}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {session.assessment_id}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">Quick Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use session_001 for Health & Fitness</li>
                  <li>• Use session_002 for Cardiac Assessment</li>
                  <li>• Reports are generated as PDF files</li>
                  <li>• Files are saved locally on the server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

