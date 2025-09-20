import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/report';

export const generateReport = (session_id, token) =>
  axios.post(
    `${API_URL}/generate-report`,
    { session_id },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const downloadReport = (session_id, token) =>
  axios.get(`${API_URL}/download/${session_id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob' 
  });



  