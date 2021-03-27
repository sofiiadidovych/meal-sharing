import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageTitle from "./PageTitle";
import PageStructure from "./PageStructure";
import { getCurrentDate } from "./MealWithId";

function MealsContainer({ meals }) {
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);

  const createMeal = () => {
    if (title === "") {
      alert("Please add a meal title");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        max_reservations: capacity,
        price: price,
        created_date: getCurrentDate(),
      }),
    };

    fetch("http://localhost:3000/api/meals/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "meals data"));
  };

  return (
    <PageStructure>
      <PageTitle />
      <section className="home-meals">
        <ul>
          {meals.map((meal) => {
            return (
              <li key={meal.idmeals}>
                <h4>
                  {meal.title} - {meal.price} DKK
                </h4>
                <Link to={`/meals/${meal.idmeals}`}>Details</Link>
              </li>
            );
          })}
        </ul>
      </section>
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
        <button>Submit</button>
      </form>
      <Link to="/">Go back home</Link>
    </PageStructure>
  );
}

export default MealsContainer;
