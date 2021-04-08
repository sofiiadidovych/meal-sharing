import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../ComponentsStyle.css";
import "./MealsContainer.css";
import PageTitle from "../PageTitle";
import PageStructure from "../PageStructure";
import { getCurrentDate } from "../MealWithId/MealWithId";

function MealsContainer({ meals, addMeal }) {
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);

  const createMeal = (event) => {
    event.preventDefault();
    if (title === "") {
      alert("Please add a meal title");
      return;
    }
    if (!capacity) {
      alert("Please add number of guests");
      return;
    }
    if (Number(price) === 0) {
      alert("Please add a meal price");
      return;
    }

    const meal = {
      title: title,
      number_of_guests: capacity,
      price: price,
      created_date: getCurrentDate(),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    };

    fetch("http://localhost:3000/api/meals/", requestOptions)
      .then((response) => response.json())
      .then((mealId) => {
        meal.id = mealId;
        addMeal(meal);
      });

    setTitle("");
    setCapacity(1);
    setPrice(0);
  };

  return (
    <PageStructure>
      <PageTitle />
      <section className="home-meals">
        <ul>
          {meals.map((meal) => {
            return (
              <li key={meal.id}>
                <h2>
                  {meal.title} - {meal.price} DKK
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <Link className="link" to={`/meals/${meal.id}`}>
                  Details
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="create_meal_form">
          <form onSubmit={createMeal}>
            <h2>Create a meal</h2>
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              type="text"
              placeholder="type your title"
              value={title}
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);
              }}
            ></input>
            <br />
            <label htmlFor="max_reservations">Max reservations: </label>
            <input
              id="max_reservations"
              type="number"
              min="1"
              placeholder="max number of guests"
              value={capacity}
              onChange={(event) => {
                const value = event.target.value;
                setCapacity(value);
              }}
            ></input>
            <br />
            <label htmlFor="price">Price: </label>
            <input
              id="price"
              type="number"
              min="0"
              placeholder="meal price"
              value={price}
              onChange={(event) => {
                const value = event.target.value;
                setPrice(value);
              }}
            ></input>
            <br />
            <button>Create</button>
          </form>
        </section>
      </section>
      <Link className="back_links" to="/">Go back home</Link>
    </PageStructure>
  );
}

export default MealsContainer;
