import React from "react";
//import mealImage from "../assets/images/mealImage.png";
import meal from "../assets/images/meal.png";

function MealItem({ title }) {
  return (
    <div className="meal-box">
      <li>
        <h3>{title}</h3>
        <img id="meal_img" src={meal} alt="image of a meal" />
      </li>
    </div>
  );
}

export default MealItem;
