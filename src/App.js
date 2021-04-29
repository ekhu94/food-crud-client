import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [editFoodName, setEditFoodName] = useState("");
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    const res = await axios.get("http://localhost:5000/foods");
    setFoods(res.data);
  };

  const addToList = async (e) => {
    await axios.post("http://localhost:5000/foods", {
      name: foodName,
      daysSinceEaten: daysSince,
    });
    getFoods();
    setFoodName("");
    setDaysSince(0);
  };

  const updateFood = async (_id) => {
    await axios.patch(`http://localhost:5000/foods/${_id}`, {
      name: editFoodName,
    });
    getFoods();
    setEditFoodName("");
  };

  const deleteFood = async (_id) => {
    await axios.delete(`http://localhost:5000/foods/${_id}`);
    getFoods();
  };

  const renderFoods = () => {
    return foods.map((food) => {
      return (
        <div key={food._id} className="food">
          <h3>
            {food.name} - {food.daysSinceEaten}{" "}
            {food.daysSinceEaten === 1 ? "day" : "days"} ago
          </h3>
          <input
            type="text"
            placeholder="Edit Food Name..."
            onChange={(e) => setEditFoodName(e.target.value)}
          />
          <button onClick={() => updateFood(food._id)}>Update</button>
          <button onClick={() => deleteFood(food._id)}>Delete</button>
        </div>
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
