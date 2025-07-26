const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login endpoint
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // No JWT, just return user info
    res.json({ message: 'Login successful', name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Change password endpoint
app.post('/api/users/change-password', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  console.log('Change password request:', req.body);
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
      console.error('User not found:', email);
      return res.status(404).json({ message: 'User not found.' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.error('Incorrect current password for:', email);
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    console.log('Password updated for:', email);
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update user name endpoint
app.post('/api/users/update-name', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required.' });
  }
  try {
    const user = await User.findOneAndUpdate({ email }, { name }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'Name updated successfully.', name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Cart schema and model
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

// Add to cart endpoint
app.post('/api/cart/add', async (req, res) => {
  const { email, product } = req.body; // product: { productId, name, price, quantity }
  if (!email || !product || !product.productId) {
    return res.status(400).json({ message: 'Email and product info required.' });
  }
  try {
    let cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      cart = new Cart({ userEmail: email, items: [product] });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(item => item.productId === product.productId);
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        cart.items.push(product);
      }
    }
    await cart.save();
    res.json({ message: 'Product added to cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Clear cart endpoint
app.post('/api/cart/clear', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email required.' });
  }
  try {
    const cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get cart endpoint
app.get('/api/cart', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email required.' });
  }
  try {
    const cart = await Cart.findOne({ userEmail: email });
    res.json({ cart: cart || { userEmail: email, items: [] } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Remove item from cart endpoint
app.post('/api/cart/remove', async (req, res) => {
  const { email, productId } = req.body;
  if (!email || !productId) {
    return res.status(400).json({ message: 'Email and productId required.' });
  }
  try {
    const cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    res.json({ message: 'Product removed from cart.', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update item quantity in cart endpoint
app.post('/api/cart/update', async (req, res) => {
  const { email, productId, quantity } = req.body;
  if (!email || !productId || typeof quantity !== 'number') {
    return res.status(400).json({ message: 'Email, productId, and quantity required.' });
  }
  try {
    const cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    const item = cart.items.find(item => item.productId === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }
    item.quantity = quantity;
    await cart.save();
    res.json({ message: 'Cart item quantity updated.', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Order schema and model
const orderProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  products: [orderProductSchema],
});

const Order = mongoose.model('Order', orderSchema);

// Create order endpoint
app.post('/api/orders', async (req, res) => {
  const { customerName, total, products } = req.body;
  if (!customerName || typeof total !== 'number' || !Array.isArray(products)) {
    return res.status(400).json({ message: 'Invalid order data.' });
  }
  try {
    const order = new Order({ customerName, total, products });
    await order.save();
    res.status(201).json({ message: 'Order created successfully.', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all orders endpoint
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get order by ID endpoint
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Product schema and model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add other fields as needed
});
const Product = mongoose.model('Product', productSchema);

// Get all products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 