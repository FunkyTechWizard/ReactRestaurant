const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
},{collection: 'Menu'});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
