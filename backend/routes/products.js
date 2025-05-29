const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products → fetch all products (no pagination)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/search', async (req, res) => {
  const nameQuery = req.query.name || '';
  try {
    const regex = new RegExp(nameQuery, 'i'); // case-insensitive match
    const products = await Product.find({ name: { $regex: regex } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
