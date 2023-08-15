// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./authRoutes');

const app = express();
const port = 8080; // Change this to your desired port

// Define your Order model schema here
const orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve menu.json as a static resource
app.use('/static', express.static(path.join(__dirname, 'menu.json')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://Utsav:756721@cluster0.1dt8emf.mongodb.net/ReactRestaurant?retryWrites=true&w=majority', {
  dbName: 'Resturants',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/menu', routes);
app.use('/api/auth', authRoutes);

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Delete an order by ID
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
