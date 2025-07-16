const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-secret-key';

module.exports = {
  register: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest({ message: 'Missing email or password' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const newUser = await User.create({ email, password }).fetch();
      return res.status(201).json({ message: 'User created', user: newUser });
    } catch (err) {
      return res.serverError(err);
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest({ message: 'Missing email or password' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Wrong password' });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '5h' });

      return res.json({ message: 'Login successful', token });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
