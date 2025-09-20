import React, { useState, useContext } from 'react';
import { generateReport, downloadReport } from '../../api/report';
import { AuthContext } from '../../context/AuthContext';

export default function GenerateReportForm() {
  const { token } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    try {
      await generateReport(sessionId, token);
      setMessage('Report generated successfully. You can now download.');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to generate report.');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!sessionId.trim()) {
      setErrors({ sessionId: 'Session ID is required for download' });
      return;
    }
    try {
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
      setMessage('Download started.');
    } catch {
      setMessage('Failed to download the report.');
    }
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg"
      noValidate
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Generate PDF Report</h2>

      <input
        type="text"
        value={sessionId}
        onChange={handleSessionIdChange}
        placeholder="Enter session_id"
        className={`w-full px-4 py-3 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.sessionId ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={!!errors.sessionId}
        aria-describedby="sessionIdError"
      />
      {errors.sessionId && (
        <p id="sessionIdError" className="text-red-600 text-sm mb-4">
          {errors.sessionId}
        </p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex-grow bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Download PDF
        </button>
      </div>
      {message && <p className="mt-6 text-center text-gray-700">{message}</p>}
    </form>
  );
}


