import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import MealsContainer from "./components/MealsContainer";
import MealWithId from "./components/MealWithId";

const MEALS_API = "http://localhost:3000/api/meals";

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(MEALS_API)
      .then((response) => response.json())
      .then((fetchedMeals) => setMeals(fetchedMeals));
  }, []);

  console.log(meals);

  return (
    <Router>
      <Route exact path="/">
        <Home meals={meals}/>
      </Route>
      <Route exact path="/meals">
        <MealsContainer meals={meals} />
      </Route>
      <Route path="/meals/:id">
        <MealWithId meals={meals} />
      </Route>
    </Router>
  );
}

export default App;
