const express = require('express');
const { authenticateJWT } = require('../middlewares/jwtauth');
const Videogame = require('../models/videogame');
const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { title, year, units } = req.body;
    const videogame = await Videogame.create({ title, year, units });
    res.status(201).json(videogame);
  } catch (error) {
    res.status(500).json({ error: 'Could not create videogame' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const videogames = await Videogame.findAll();
    res.json(videogames);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch videogames' });
  }
});

router.get('/:title', authenticateJWT, async (req, res) => {
  try {
    const videogame = await Videogame.findByPk(req.params.title);
    if (!videogame) return res.status(404).json({ error: 'Videogame not found' });
    res.json(videogame);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch videogame' });
  }
});

router.put('/:title', authenticateJWT, async (req, res) => {
  try {
    const { year, units } = req.body;
    const videogame = await Videogame.findByPk(req.params.title);
    if (!videogame) return res.status(404).json({ error: 'Videogame not found' });

    videogame.year = year;
    videogame.units = units;

    await videogame.save();
    res.json(videogame);
  } catch (error) {
    res.status(500).json({ error: 'Could not update videogame' });
  }
});

router.delete('/:title', authenticateJWT, async (req, res) => {
  try {
    const videogame = await Videogame.findByPk(req.params.title);
    if (!videogame) return res.status(404).json({ error: 'Videogame not found' });

    await videogame.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete videogame' });
  }
});

module.exports = router;
