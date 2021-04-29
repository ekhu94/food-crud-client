import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [daysSince, setDaysSince] = useState(0);

  const addToList = async (e) => {
    await axios.post("http://localhost:5000/foods", {
      name: foodName,
      daysSinceEaten: daysSince,
    });
    setFoodName("");
    setDaysSince(0);
  };

  return (
    <div className="App">
      <h1>Food Crud App with MERN</h1>

      <label htmlFor="name">Food Name: </label>
      <input
        type="text"
        id="name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label htmlFor="daysSinceEaten">Days Since Eaten: </label>
      <input
        type="number"
        id="daysSinceEaten"
        value={daysSince}
        onChange={(e) => setDaysSince(e.target.value)}
      />
      <button onClick={addToList}>Add Food</button>
    </div>
  );
};

export default App;
