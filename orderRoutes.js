const express = require('express');
const router = express.Router();
const menu = require('./menu.json');

router.get('/:id', (req, res) => {
  const orderId = req.params.id;
  const order = menu.find((item) => item.id === orderId);

  if (!order) {
    res.status(404).json({ error: 'Order not found' });
  } else {
    res.json(order);
  }
});

module.exports = router;
