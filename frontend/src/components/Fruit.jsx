// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fruit.css'; // Import the CSS file

const Fruit = () => {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState('');

  const baseURL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000';

  // Fetch fruits from backend
  useEffect(() => {
    axios.get(`${baseURL}/api/fruits`)
      .then(res => setFruits(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new fruit
  const addFruit = () => {
    axios.post(`${baseURL}/api/fruits`, { name: newFruit })
      .then(res => setFruits([...fruits, res.data]))
      .catch(err => console.error(err));
    setNewFruit('');
  };

  // Delete a fruit
  const deleteFruit = (id) => {
    axios.delete(`${baseURL}/api/fruits/${id}`)
      .then(() => setFruits(fruits.filter(fruit => fruit._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="app">
      <header>
        <h1>Fruits Manager</h1>
      </header>
      <main>
        <div className="form">
          <input
            type="text"
            value={newFruit}
            onChange={(e) => setNewFruit(e.target.value)}
            placeholder="Add a fruit"
          />
          <button onClick={addFruit}>Add</button>
        </div>
        <ul className="fruit-list">
          {fruits.map(fruit => (
            <li key={fruit._id}>
              {fruit.name}
              <button className="delete-btn" onClick={() => deleteFruit(fruit._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Fruit;
