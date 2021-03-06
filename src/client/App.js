import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import MealsContainer from "./components/MealsContainer/MealsContainer";
import MealWithId from "./components/MealWithId/MealWithId";

const MEALS_API = "/api/meals";

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(MEALS_API)
      .then((response) => response.json())
      .then((fetchedMeals) => setMeals(fetchedMeals))
      .finally(() => setIsLoading(false));
  }, []);

  const addMeal = (meal) => {
    setMeals([...meals, meal])
  }

  return (
    <Router>
      <Route exact path="/">
        <Home meals={meals}/>
      </Route>
      <Route exact path="/meals">
        <MealsContainer meals={meals} addMeal={addMeal}/>
      </Route>
      <Route exact path="/meals/:id">
        <MealWithId meals={meals} />
      </Route>
    </Router>
  );
}

export default App;
