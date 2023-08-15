const express = require('express');
const router = express.Router();
const menuItemController = require('./menuItemController');

// Create a new menu item
router.post('/', menuItemController.createMenuItem);

// Get all menu items
router.get('/', menuItemController.getAllMenuItems);

// Get a menu item by ID
router.get('/:id', menuItemController.getMenuItemById);

// Update a menu item
router.put('/:id', menuItemController.updateMenuItem);

// Delete a menu item
router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;

