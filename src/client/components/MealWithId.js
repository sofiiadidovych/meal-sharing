import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageStructure from "./PageStructure";

function MealWithId({ meals }) {
  const [guests, setGuests] = useState(1);

  const params = useParams();
  console.log(params.id);
  const meal = meals.find((meal) => meal.idmeals === Number(params.id));

  const addReservation = () => {
    const currentDate = new Date();
    const currentDateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meal_id: meal.idmeals,
        number_of_guests: guests,
        created_date: currentDateStr,
      }),
    };

    fetch("http://localhost:3000/api/reservations/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "reservations data"));
  };

  return (
    <PageStructure>
      <div>
        {!meal ? (
          <div>Not found</div>
        ) : (
          <div>
            {meal.title} - {meal.price}
            <p>Maximum reservation capacity: {meal.max_reservations}</p>
          </div>
        )}
        <form>
          <section className="reservation">
            <p>Make a reservation</p>
            <label htmlFor="reservation">For number of guests: </label>
            <input
              type="number"
              min="1"
              id="reservation"
              placeholder="number of guests"
              value={guests}
              onChange={(event) => {
                const value = event.target.value;
                setGuests(value);
              }}
            ></input>
            <button onClick={addReservation}>Add</button>
          </section>
        </form>
        <Link to="/meals">Go back</Link>
      </div>
    </PageStructure>
  );
}

export default MealWithId;
