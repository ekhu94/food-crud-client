import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const getFoods = async () => {
      const res = await axios.get("http://localhost:5000/foods");
      setFoods(res.data);
    };
    getFoods();
  }, []);

  const addToList = async (e) => {
    const res = await axios.post("http://localhost:5000/foods", {
      name: foodName,
      daysSinceEaten: daysSince,
    });
    setFoods([...foods, res.data]);
    setFoodName("");
    setDaysSince(0);
  };

  const renderFoods = () => {
    return foods.map((food) => {
      return (
        <h4 key={food.id}>
          {food.name} - {food.daysSinceEaten}{" "}
          {food.daysSinceEaten === 1 ? "day" : "days"} ago
        </h4>
      );
    });
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

      <h2>Food List</h2>
      {renderFoods()}
    </div>
  );
};

export default App;
