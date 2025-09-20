const data = require('../data/data');

exports.getSessions = (req, res) => {
  // Returns [{session_id, assessment_id}, ...] or just session_id
  const sessions = Object.values(data).map(item => ({
    session_id: item.session_id,
    assessment_id: item.assessment_id
  }));
  res.json(sessions);
};




