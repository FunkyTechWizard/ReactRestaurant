const MenuItem = require('./menuItemSchema');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  const { name, price, description } = req.body;

  const newItem = new MenuItem({
    name,
    price,
    description,
  });

  try {
    await newItem.save();
    res.status(200).json({ message: 'Menu item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a menu item by ID
exports.getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.status(200).json(menuItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    if (!updatedMenuItem) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.status(200).json(updatedMenuItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.status(200).json({ message: 'Menu item deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
