import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [daysSince, setDaysSince] = useState(0);

  return (
    <div className="App">
      <h1>Food Crud App with MERN</h1>

      <label for="name">Food Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label for="daysSinceEaten">Days Since Eaten: </label>
      <input
        type="number"
        name="daysSinceEaten"
        id="daysSinceEaten"
        value={daysSince}
        onChange={(e) => setDaysSince(e.target.value)}
      />
      <button type="submit">Add Food</button>
    </div>
  );
};

export default App;
