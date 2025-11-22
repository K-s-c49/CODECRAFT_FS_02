const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    // Check if header starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { adminId, role, iat, exp }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
