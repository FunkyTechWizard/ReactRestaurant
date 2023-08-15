import React, { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddedCard, setShowAddedCard] = useState(false);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/menu/");
      const data = response.data;
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const addMenuItem = async (menuItem: any) => {
    try {
      const response = await axios.post("http://localhost:8080/menu/", menuItem);
      const createdMenuItem = response.data;
      setMenuItems([...menuItems, createdMenuItem]);
      setShowAddedCard(true);
      setTimeout(() => {
        setShowAddedCard(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const updateMenuItem = async (index: number, updatedMenuItem: any) => {
    try {
      const menuItemId = menuItems[index]._id;
      const response = await axios.put(
        `http://localhost:8080/menu/${menuItemId}`,
        updatedMenuItem
      );
      const updatedItem = response.data;
      setMenuItems([
        ...menuItems.slice(0, index),
        updatedItem,
        ...menuItems.slice(index + 1)
      ]);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const deleteMenuItem = async (index: number) => {
    try {
      const menuItemId = menuItems[index]._id;
      await axios.delete(`http://localhost:8080/menu/${menuItemId}`);
      setMenuItems([...menuItems.slice(0, index), ...menuItems.slice(index + 1)]);
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index?: number) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const priceInput = form.elements.namedItem("price") as HTMLInputElement;
  const descriptionInput = form.elements.namedItem("description") as HTMLInputElement;
  
  const name = nameInput.value;
  const price = parseFloat(priceInput.value);
  const description = descriptionInput.value;

  const menuItem = { name, price, description };

  if (index !== undefined) {
    updateMenuItem(index, menuItem);
  } else {
    addMenuItem(menuItem);
  }

  form.reset();
};

  const handleAddToCart = (menuItem: any) => {
    const queryString = `?name=${encodeURIComponent(menuItem.name)}&price=${encodeURIComponent(menuItem.price)}&description=${encodeURIComponent(menuItem.description)}`;
    const url = `/orders${queryString}`;
    
    // Use window.location.href to perform the redirect
    window.location.href = url;
  };

  return (
    <div className="menu-container">
      <div className="data-section">
      <h2 className="menu-title">Menu</h2>
      {menuItems.length === 0 ? (
        <div className="loading-menu">Loading menu...</div>
      ) : (
        <ul className="menu-list">
          {menuItems.map((menuItem, index) => (
            <li className="menu-item" key={index}>
              {editingIndex === index ? (
                <form className="edit-menu-form" onSubmit={(e) => handleSubmit(e, index)}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={menuItem.name}
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    defaultValue={menuItem.price}
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    defaultValue={menuItem.description}
                    required
                  />
                  <button type="submit" className="save-menu-button">Save</button>
                  <button type="button" onClick={handleCancelEdit} className="cancel-edit-button">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3>{menuItem.name}</h3>
                  <p>{menuItem.description}</p>
                  <p>Price: ${menuItem.price}</p>
                  <div className="menu-item-buttons">
                    <button onClick={() => handleEdit(index)} className="edit-menu-button">Edit</button>
                    <button onClick={() => deleteMenuItem(index)} className="delete-menu-button">Delete</button>
                    <button onClick={() => handleAddToCart(menuItem)} className="add-to-cart-button">Add to Cart</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className="form-section">
      <form className="add-menu-form" onSubmit={handleSubmit}>
        <h3 className="lp">Add New Menu Item</h3>
        <input type="text" name="name" placeholder="Name" required />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
        />
        <button type="submit" className="add-menu-button">Add Item</button>
      </form>
      {showAddedCard && (
        <div className="added-card">
          <p>Item added successfully!</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default MenuComponent;
