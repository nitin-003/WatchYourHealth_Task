const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if(!header || !header.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = header.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(err){
    res.status(401).json({ msg: 'Token not valid' });
  }
};

module.exports = auth;



