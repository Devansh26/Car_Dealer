// middlewares/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.userId = decoded.userId;

    // Call the next middleware
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or missing token' });
  }
};

module.exports = auth;