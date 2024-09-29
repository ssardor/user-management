const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Получение всех пользователей
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Блокировка пользователя
router.patch('/block/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'Blocked' }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Разблокировка пользователя
router.patch('/unblock/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'Active' }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление пользователя
router.delete('/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;