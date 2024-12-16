// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://nujra0707:nujra070798@cluster0.rfq9a7b.mongodb.net/Fruits?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Fruit Schema
const fruitSchema = new mongoose.Schema({
  name: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// Routes
// Get all fruits
app.get('/api/fruits', async (req, res) => {
  const fruits = await Fruit.find();
  res.json(fruits);
});

// Add a new fruit
app.post('/api/fruits', async (req, res) => {
  const { name } = req.body;
  const newFruit = new Fruit({ name });
  await newFruit.save();
  res.json(newFruit);
});

// Delete a fruit
app.delete('/api/fruits/:id', async (req, res) => {
  const { id } = req.params;
  await Fruit.findByIdAndDelete(id);
  res.json({ message: 'Fruit deleted' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
