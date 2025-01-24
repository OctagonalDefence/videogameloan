const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('password123', 10) } 
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid username or password' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;

