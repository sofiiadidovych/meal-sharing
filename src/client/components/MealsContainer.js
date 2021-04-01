import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ComponentsStyle.css";
import "./MealsContainer.css";
import PageTitle from "./PageTitle";
import PageStructure from "./PageStructure";
import { getCurrentDate } from "./MealWithId";

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
    if (title === "") {
      alert("Please add a meal title");
      return;
    }
    if (title === "") {
      alert("Please add a meal title");
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
                <h4>
                  {meal.title} - {meal.price} DKK
                </h4>
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
      <Link to="/">Go back home</Link>
    </PageStructure>
  );
}

export default MealsContainer;
