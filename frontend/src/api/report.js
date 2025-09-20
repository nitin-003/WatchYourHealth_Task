import axios from 'axios';

const API_URL = 'http://localhost:5000/api/report';

export const generateReport = (session_id, token) =>
  axios.post(
    `${API_URL}/generate-report`,
    { session_id },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const downloadReport = (session_id, token) =>
  axios.get(`${API_URL}/download/${session_id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob' // important for file download
  });

  