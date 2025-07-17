const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

module.exports = async function (req, res, proceed) {
  const authHeader = req.headers.authorization;

  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ id: payload.id });
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = {
      id: user.id,
      username: user.username,
      permissions: user.permissions || []  
    };
    return proceed();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
