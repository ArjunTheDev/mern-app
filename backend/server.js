const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const fruitSchema = new mongoose.Schema({
  name: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

app.get('/api/fruits', async (req, res) => {
  const fruits = await Fruit.find();
  res.json(fruits);
});

app.post('/api/fruits', async (req, res) => {
  const { name } = req.body;
  const newFruit = new Fruit({ name });
  await newFruit.save();
  res.json(newFruit);
});

app.delete('/api/fruits/:id', async (req, res) => {
  const { id } = req.params;
  await Fruit.findByIdAndDelete(id);
  res.json({ message: 'Fruit deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
